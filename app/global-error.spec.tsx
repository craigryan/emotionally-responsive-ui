import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Error from './global-error';

describe('App root level Error', () => {
    it('renders the error message', () => {
        const resetMock = jest.fn();
        const { getByText } = render(<Error reset={resetMock} />);
        const errorMessage = getByText('Something went globally wrong with your Application session!');
        expect(errorMessage).toBeInTheDocument();
    });

    it('calls the reset function when the "Try again" button is clicked', () => {
        const resetMock = jest.fn();
        const { getByText } = render(<Error reset={resetMock} />);
        const tryAgainButton = getByText('Try again');
        fireEvent.click(tryAgainButton);
        expect(resetMock).toHaveBeenCalled();
    });
});
