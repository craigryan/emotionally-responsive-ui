import React from 'react';
import { render } from '@testing-library/react';

import { StoreProvider } from './StoreProvider';

describe('StoreProvider', () => {
    it('should render children', () => {
        const { getByText } = render(
            <StoreProvider>
                <div>Test Children</div>
            </StoreProvider>,
        );

        expect(getByText('Test Children')).toBeInTheDocument();
    });
});
