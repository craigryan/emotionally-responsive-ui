SERVICE             ?= er-ui
DOMAIN              ?= ryanfuse
ENV                 ?= local
HTTP_PORT           ?= 3000
NODE_OPTIONS        ?= --max-old-space-size=1400

TESTARGS            ?= ""

# PLAYWRIGHT_PROJECTS ?= --project chrome --project webkit --project mobile-chrome --project mobile-safari
PLAYWRIGHT_PROJECTS ?= --project chrome
ifeq ($(ENV), prod)
	TESTARGS := --grep @smoke $(PLAYWRIGHT_PROJECTS)
else ifneq (,$(findstring project,$(TESTARGS)))
	TESTARGS := $(TESTARGS)
else
	TESTARGS := $(TESTARGS) $(PLAYWRIGHT_PROJECTS)
endif

# Match package.json
PLAYWRIGHT_DOCKER_VERSION = 1.45.3

YARN_ARGS ?=
ifeq (${CI}, true)
	YARN_ARGS := --immutable
endif

DOCKER_SECRET_ARGS ?= 

ASSETS_BUCKET_REGION = ""
ASSETS_BUCKET_PREFIX = er

# -include future-ci-tools/makelib/common.mk, deployimage.mk etc

.PHONY: default \
		local-build-image \
		docker-build-local docker-start-local \
		build start start-dev start-dev-reload test test-cov lint \
		help \
		submodules fallthrough \
		compile format-check format-write

default: help

install:
	PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
	NODE_OPTIONS=$(NODE_OPTIONS) \
	yarn install $(YARN_ARGS)

install-playwright-browsers: install
	echo "INSTALLING $$PLAYWRIGHT_DOCKER_VERSION" ;\
	npx --yes playwright@$$PLAYWRIGHT_DOCKER_VERSION install ;\
	yarn playwright install-deps

start:
	yarn dev

build:
	yarn build

test:
	docker compose up -d wiremock
	yarn test

test-cov:
	docker compose up -d wiremock
	NODE_OPTIONS=$(NODE_OPTIONS) \
	yarn test:cov -i

# Chrome can only be built on an AMD64 image, we can't build
# an arm64 OSX image. It makes running playwright via docker on OSX very very very slow.
#
test-e2e:
ifeq ($(CI), true)
	PLAYWRIGHT_VERSION=`yarn info --json @playwright/test | jq -r ".children.Version"` \
	ENV="$(ENV)" \
	NODE_OPTIONS="$(NODE_OPTIONS)" \
	TESTARGS="$(TESTARGS)" \
	docker compose \
		-f ./docker-compose.yml \
		up --exit-code-from test_e2e ;\
	STATUS=$$?; \
	$(MAKE) archive-results; \
	exit $${STATUS}   
else
	@if [ `open -Ra "Google Chrome"; echo $$?` -gt 0  ]; then \
	echo "Chrome is not installed, please install chrome" ;\
	exit 1 ;\
	fi
	$(MAKE) install-playwright-browsers
	yarn test:e2e:cbt $(TESTARGS)
endif

archive-results:
ifeq (${CI}, true)
	cp -R playwright-report /tmp/build-artifacts
endif

# The playwright version we use in package.json HAS to match the docker version
# see install-playwright-browsers comment for details.
# We want to error out early if they don't match
lint:
	@CURR_PLAYWRIGHT_VERSION=`yarn info --json @playwright/test | jq -r ".children.Version"`;\
	if [ "$$CURR_PLAYWRIGHT_VERSION" != "$(PLAYWRIGHT_DOCKER_VERSION)" ]; then \
		echo "Error: Playwright version mismatch: "; \
		echo "package.json version = $$CURR_PLAYWRIGHT_VERSION !=  CI docker version = $(PLAYWRIGHT_DOCKER_VERSION)"; \
		exit 1; \
	fi; \
	NODE_OPTIONS=$(NODE_OPTIONS) \
	yarn lint

compile:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	yarn ts

format-check:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	yarn format:check

format-write:
	yarn format:write

docker-build-local:
	ALWAYS_BUILD=true BUILD_PLATFORMS="linux/$(ARCH)"	DOCKER_BUILDX_CMDS="--load --progress=plain $(DOCKER_SECRET_ARGS) --build-arg ENV=$(ENV) --build-arg NODE_OPTIONS=$(NODE_OPTIONS)" $(MAKE) build-image

docker-start-local: docker-build-local
	docker run --rm \
		--env ENV=local \
		--env KAFKA_URL=host.docker.internal:1111 \
		--publish ${HTTP_PORT}:${HTTP_PORT} \
		${IMAGE_NAME}:${IMAGE_TAG}

.PHONY: docker-build
docker-build:
	docker info
	echo "build main dockerfile"
	DOCKER_BUILDX_CMDS="$(DOCKER_SECRET_ARGS) --build-arg ENV=$(ENV) --build-arg NODE_OPTIONS=$(NODE_OPTIONS)" IMAGE_TAG_PREFIX=$(ENV) $(MAKE) build-image
	echo "building wiremock"
	IMAGE_TAG_PREFIX=wiremock DOCKERFILE=Dockerfile.wiremock $(MAKE) build-image

.PHONY: docker-push
docker-push:
	echo "Build & pushing main Dockerfile"
	DOCKER_BUILDX_CMDS="$(DOCKER_SECRET_ARGS) --load --build-arg ENV=$(ENV) --build-arg NODE_OPTIONS=$(NODE_OPTIONS)" IMAGE_TAG_PREFIX=$(ENV) $(MAKE) build-image ;\
	IMAGE_TAG_PREFIX=$(ENV) $(MAKE) publish-next-assets ;\
	IMAGE_TAG_PREFIX=$(ENV) $(MAKE) push-image ;\
	echo "Building and pushing wiremock"
	DOCKER_BUILDX_CMDS="--push" IMAGE_TAG_PREFIX=wiremock DOCKERFILE=Dockerfile.wiremock $(MAKE) build-image

.PHONY: publish-next-assets
publish-next-assets:
	docker cp $$(docker create $(SERVICE_IMAGE)):/usr/app/.next/static - > static.tar && tar -vxf static.tar
#   static s3 sync or equiv

help:
	@echo "Available commands:"
	@echo "  docker-build-local  - build and tag the Docker image for local"
	@echo "  docker-start-local  - start the app from the local Docker image"
	@echo "  start               - start the app"
	@echo "  test                - run all tests"
	@echo "  test-cov            - run all tests and generate coverage report"
	@echo "  lint                - run linting"

# We want submodules to be set up the first time `make` is run.
# We manage the platform-ci-tools/ folder and its Makefiles as a submodule.
# The first time `make` is run, the includes of platform-ci-tools/*.mk files will
# all fail, and this target will be run. The next time, the default as defined
# by the includes will be run instead.
fallthrough: submodules
	@echo Initial setup completed. Re-running make..
	@make

# Update the submodules, such as the common build scripts.
submodules:
	@git submodule sync
	@git submodule update --init --recursive

-include future-ci-tools/makelib/docker.mk

.PHONY: test-ci
test-ci: test-cov

.PHONY: lint-ci
lint-ci: lint compile format-check

.PHONY: docker-build-ci
docker-build-ci: 
	NODE_OPTIONS="--max-old-space-size=2800" $(MAKE) docker-build

.PHONY: docker-push-ci
docker-push-ci: 
	NODE_OPTIONS="--max-old-space-size=2800" $(MAKE) docker-push

.PHONY: install-ci
install-ci: install
