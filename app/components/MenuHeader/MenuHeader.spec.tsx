import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NextIntlClientProvider } from 'next-intl';

import enJson from '@/messages/en.json';

import { MenuHeader } from './MenuHeader';

const renderWithProviders = (children: React.ReactNode) => {
    return render(
        <NextIntlClientProvider locale={'en'} messages={enJson}>
            {children}
        </NextIntlClientProvider>,
    );
};

const setup = () => {
    const render = renderWithProviders(<MenuHeader />);
    return render;
};

describe('MenuHeader', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            value: {
                href: 'http://localhost:3000',
            },
            writable: true,
        });
    });

    it('should render the logo with i18n translation (en)', () => {
        setup();
        expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    it('should display the view profile link', () => {
        setup();
        expect(screen.getByText('View Profile')).toBeInTheDocument();
    });
});
