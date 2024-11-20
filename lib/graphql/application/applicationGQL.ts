import { gql } from '@apollo/client';

/**
 * Queries
 */

/**
 * Mutations
 */
export const CREATE_APPLICATION = gql`
    mutation createApplication($applicationInput: ApplicationInput!) {
        createApplication(applicationInput: $applicationInput) {
            applicationType
            status
        }
    }
`;
