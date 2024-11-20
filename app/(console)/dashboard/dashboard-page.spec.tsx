import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import enJson from '@/messages/en.json';

import DashboardPage from './page';

import { logger } from '@/lib/utils/logger';

const renderWithProviders = (children: React.ReactNode) => {
    return render(
        <NextIntlClientProvider locale={'en'} messages={enJson}>
            {children}
        </NextIntlClientProvider>,
    );
};

describe('Create Page', () => {
    describe('and scrollTo', () => {
        it('should log the section name', () => {
            const loggerSpy = jest.spyOn(logger, 'info');
            const section = 'Core Audio Files';

            renderWithProviders(<DashboardPage />);

            const scrollTo = screen.getByTestId('audio-scroll');
            fireEvent.click(scrollTo);

            expect(loggerSpy).toHaveBeenCalledWith('Scroll to section', section);
        });
    });
});
