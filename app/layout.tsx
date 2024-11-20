import React from 'react';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { StyledEngineProvider } from '@mui/material/styles';

import { ApolloWrapper } from '@/lib/graphql/apolloWrapper';

import { StoreProvider } from '@/lib/state/StoreProvider';
import '@/lib/styles/globals.scss';

export const metadata: Metadata = {
    title: 'Emotionally Responsive',
    description: 'Emotionally Responsive',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const locale = await getLocale();
    const messages = await getMessages();

    // MUI Ref: https://mui.com/material-ui/integrations/interoperability/#tailwind-css
    return (
        <html lang={locale}>
            <body>
                <StyledEngineProvider injectFirst>
                     <ApolloWrapper>
                         <StoreProvider>
                            <NextIntlClientProvider messages={messages}>
                                <div className="theme-default bg-blue min-h-screen">{children}</div>
                             </NextIntlClientProvider>
                         </StoreProvider>
                     </ApolloWrapper>
                </StyledEngineProvider>
            </body>
        </html>
    );
};

// Required to be default by NextJS
export default RootLayout;
