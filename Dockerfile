# Install dependencies only when needed
FROM node:22.6.0-alpine AS builder

# Directory for app
WORKDIR /usr/app

# Define build arguments
ARG ENV
ARG NODE_OPTIONS

# Set environment variables with the build arguments
ENV ENV=$ENV
ENV NODE_OPTIONS=$NODE_OPTIONS
ENV CI=true

# Build time enviroment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Copy source code
COPY . .

# Install dependencies
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    yarn install --immutable

RUN export $(grep -v '^#' .env.${ENV} | xargs) && \
    yarn build:ci

# Production image, copy all the files and run next
FROM node:22.6.0-slim AS runner

WORKDIR /usr/app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /usr/app/next.config.mjs ./
COPY --from=builder --chown=nextjs:nodejs /usr/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /usr/app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["sh", "-c", "node $NODE_CMD_OPT server.js"]
