import React from 'react';
import { Provider } from 'react-redux';
import { NextIntlClientProvider } from 'next-intl';
import { render, RenderOptions, screen } from '@testing-library/react';

import { AppStore, makeStore, RootState } from '@/lib/store';
import enJson from '@/messages/en.json';

import ApplyPage from './page';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
//
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

const renderWithProviders = (ui: React.ReactNode, options: ExtendedRenderOptions = {}) => {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = makeStore(preloadedState),
        ...renderOptions
    } = options;

    const Wrapper = ({ children }: React.PropsWithChildren) => (
        <NextIntlClientProvider locale={'en'} messages={enJson}>
            <Provider store={store}>{children}</Provider>
        </NextIntlClientProvider>
    );

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
};

describe('ApplyPage', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clears mock state (calls, instances, context, etc.)
    });

    it('should render the default page correctly', () => {
        renderWithProviders(<ApplyPage />);

        const pageTitle = screen.getByRole('heading', { level: 2, name: /start your application/i });
        const applyButton = screen.getByRole('button', { name: /apply now!/i });

        expect(pageTitle).toBeInTheDocument();
        expect(applyButton).toBeInTheDocument();
    });

    it.skip('should render the page correctly when the emotion theme changes', () => {
    });
});
