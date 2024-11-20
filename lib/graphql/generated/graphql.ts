import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type Application = {
    __typename?: 'Application';
    applicationType: ApplicationType;
    /** Application Id */
    id: Scalars['String']['output'];
    status: ApplicationStatus;
};

export type ApplicationInput = {
    applicationType: ApplicationType;
    status: ApplicationStatus;
};

export enum ApplicationStatus {
    ACTIVE = 'ACTIVE',
    CLOSED = 'CLOSED',
    PENDING = 'PENDING',
}

export enum ApplicationType {
    ASSISTED_CALLBACK = 'ASSISTED_CALLBACK',
    MANUAL = 'MANUAL',
}

export type Mutation = {
    __typename?: 'Mutation';
    createApplication: Application;
};

export type MutationCreateApplicationArgs = {
    applicationInput: ApplicationInput;
};

export type Query = {
    __typename?: 'Query';
    application?: Maybe<Application>;
};

export type QueryApplicationArgs = {
    applicationId: Scalars['String']['input'];
};

export type CreateApplicationMutationVariables = Exact<{
    applicationInput: ApplicationInput;
}>;

export type CreateApplicationMutation = {
    __typename?: 'Mutation';
    createApplication: { __typename?: 'Application'; applicationType: ApplicationType; status: ApplicationStatus };
};

export const CreateApplicationDocument = gql`
    mutation createApplication($applicationInput: ApplicationInput!) {
        createApplication(applicationInput: $applicationInput) {
            applicationType
            status
        }
    }
`;

export type SdkFunctionWrapper = <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>,
    operationName: string,
    operationType?: string,
    variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {
        createApplication(
            variables: CreateApplicationMutationVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<CreateApplicationMutation> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<CreateApplicationMutation>(CreateApplicationDocument, variables, {
                        ...requestHeaders,
                        ...wrappedRequestHeaders,
                    }),
                'createApplication',
                'mutation',
                variables,
            );
        },
    };
}
export type Sdk = ReturnType<typeof getSdk>;
