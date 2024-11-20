import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './lib/graphql/schema.graphql',
    documents: ['lib/**/*.ts'],
    generates: {
        './lib/graphql/generated/graphql.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
            presetConfig: {
                gqlTagName: 'gql',
            },
        },
    },
    ignoreNoDocuments: true,
    config: {
        namingConvention: {
            enumValues: 'keep',
        },
    },
    hooks: {
        afterAllFileWrite: ['prettier --write'],
    },
};

// Required to be default by GraphQL Codegen
// eslint-disable-next-line import/no-default-export
export default config;
