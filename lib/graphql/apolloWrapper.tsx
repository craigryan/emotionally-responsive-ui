'use client';

import React from 'react';
import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import fetch from 'cross-fetch';

//import { getSession } from 'next-auth/react';

// have a function to create a client for you
export function makeClient() {
    const httpLink = new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
        fetchOptions: { cache: 'no-store' },
        fetch,
    });

    /*
    const authLink = setContext(async (_, { headers }: { headers?: Record<string, string> } = {}) => {
        const session = await getSession(); // Fetch session from NextAuth
        const token = session?.accessToken; // Extract the token from the session

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });
    */
   
    // Combine authLink and httpLink
    const link = httpLink; // authLink.concat(httpLink);

    // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
    return new ApolloClient({
        // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
        cache: new InMemoryCache(),
        link: link,
    });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
