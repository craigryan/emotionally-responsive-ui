import { waitFor } from '@testing-library/react';
import { ApolloError } from '@apollo/client';

import { makeClient } from '@/lib/graphql/apolloWrapper';
import { Application, ApplicationInput, ApplicationStatus, ApplicationType } from '@/lib/graphql/generated/graphql';
import { makeStore } from '@/lib/store';

import { createApplication, setApplication } from './applicationSlice';

jest.mock('@/lib/graphql/apolloWrapper');

describe('applicationSlice', () => {
    describe('setApplication', () => {
        it('should set application in the store', async () => {
            const store = makeStore();
            const application: Application = {
                id: '1',
                status: ApplicationStatus.ACTIVE,
                applicationType: ApplicationType.ASSISTED_CALLBACK,
            };

            // Assert initial state
            expect(store.getState().application.application ?? null).toBeNull();

            // Dispatch setApplications
            store.dispatch(setApplication(application));

            // Assert application is stored in the Redux store
            await waitFor(() => expect(store.getState().application.application).toEqual(application));
        });
    });

    describe('createApplication', () => {
        const applicationInput: ApplicationInput = {
            status: ApplicationStatus.ACTIVE,
            applicationType: ApplicationType.MANUAL,
        };

        it('should reject when an error occurs', async () => {
            const store = makeStore();
            const mockMutate = jest
                .fn()
                .mockRejectedValue(new ApolloError({ errorMessage: 'Some error', graphQLErrors: [] }));

            (makeClient as jest.Mock).mockReturnValue({
                mutate: mockMutate,
            });

            expect(store.getState().application.error ?? null).toBeNull();

            await store.dispatch(createApplication(applicationInput));

            // Assert error is thrown
            expect(store.getState().application.error).toEqual('Error occured when creating application');
        });

        it('should create application and store in the Redux store', async () => {
            const store = makeStore();

            const mockResult: Application = {
                id: 'appl_1',
                status: ApplicationStatus.ACTIVE,
                applicationType: ApplicationType.MANUAL,
            };

            const mockMutate = jest.fn().mockResolvedValue({
                data: {
                    createApplication: mockResult,
                },
            });

            (makeClient as jest.Mock).mockReturnValue({
                mutate: mockMutate,
            });

            // Dispatch createApplication
            await store.dispatch(createApplication(applicationInput));

            expect(store.getState().application.application).toEqual(mockResult);
            expect(store.getState().application.error ?? null).toBeNull();
        });
    });
});
