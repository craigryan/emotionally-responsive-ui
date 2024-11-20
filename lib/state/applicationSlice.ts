import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { makeClient } from '@/lib/graphql/apolloWrapper';
import {
    Application,
    ApplicationInput,
} from '@/lib/graphql/generated/graphql';
import { RootState } from '@/lib/store';

import { CREATE_APPLICATION } from '@/lib/graphql/application/applicationGQL';

interface ApplicationState {
    application: Application | null; // update an application
    error?: string;
    loading: boolean;
}

const initialState: ApplicationState = {
    application: null,
    error: undefined,
    loading: false,
};

export const createApplication = createAsyncThunk<CreateApplicationMutation, ApplicationInput, { rejectValue: string | undefined }>(
    'application/createApplication',
    async (applicationInput: ApplicationInput, { rejectWithValue }) => {
        try {
            const client = makeClient();
            const result = await client.mutate<CreateApplicationMutation, CreateApplicationMutationVariables>({
                mutation: CREATE_APPLICATION,
                variables: { applicationInput },
            });

            if (!result.data || result.errors) {
                return rejectWithValue(undefined);
            }

            return result.data;
        } catch (err) {
            return rejectWithValue(err instanceof Error ? err.message : 'Unknown error occured when creating application');
        }
    },
);

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplication: (state, action: PayloadAction<Application>) => {
            state.application = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createApplication.pending, (state) => {
                state.error = undefined;
                state.loading = true;
            })
            .addCase(createApplication.fulfilled, (state, action: PayloadAction<CreateApplicationMutation>) => {
                const createdApplication = action.payload.createApplication;
                state.application = createdApplication;
                state.error = undefined;
                state.loading = false;
            })
            .addCase(createApplication.rejected, (state) => {
                state.error = 'Error occured when creating application';
                state.loading = false;
            });
    },
});

export const selectApplication = (state: RootState) => state.application.application;
export const selectApplicationLoading = (state: RootState) => state.application.loading;
export const selectApplicationError = (state: RootState) => state.application.error;

export const { setApplication } = applicationSlice.actions;
export const { reducer } = applicationSlice;
