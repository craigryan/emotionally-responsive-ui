import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import enJson from '@/messages/en.json';

import DesktopOnlyPage from './page';

const renderWithProviders = (children: React.ReactNode) => {
    return render(
        <NextIntlClientProvider locale={'en'} messages={enJson}>
            {children}
        </NextIntlClientProvider>,
    );
};

const setup = () => {
    const render = renderWithProviders(<DesktopOnlyPage />);
    return render;
};

describe('DesktopOnlyPage', () => {
    beforeAll(() => {
    });

    it('should render the page with title and button', () => {
        setup();
        expect(screen.getByText(/Please use a/i)).toBeInTheDocument();
    });
});
