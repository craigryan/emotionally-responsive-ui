import { render } from '@testing-library/react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import HomePage from './page';

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

jest.mock('next/headers', () => ({
    headers: jest.fn(),
}));

describe('HomePage', () => {
    it('should redirect to "/dashboard for desktop"', () => {
        (headers as jest.Mock).mockReturnValue({
            get: jest
                .fn()
                .mockReturnValue(
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                ),
        });

        render(<HomePage />);
        expect(redirect).toHaveBeenCalledWith('/list-products');
    });

    it('should redirect to /desktop-only for mobile user agents', () => {
        (headers as jest.Mock).mockReturnValue({
            get: jest
                .fn()
                .mockReturnValue(
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                ),
        });

        render(<HomePage />);
        expect(redirect).toHaveBeenCalledWith('/desktop-only');
    });
});
