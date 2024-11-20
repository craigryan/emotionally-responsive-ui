import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ErrorElement from './error';

describe('Task level Error', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the error message', () => {
        const resetMock = jest.fn();
        const { getByText } = render(<ErrorElement reset={resetMock} />);
        const errorMessage = getByText('Something went wrong with your Dashboard!');
        expect(errorMessage).toBeInTheDocument();
    });

    it('calls the reset function when the "Try again" button is clicked', () => {
        const resetMock = jest.fn();
        const { getByText } = render(<ErrorElement reset={resetMock} />);
        const tryAgainButton = getByText('Try again');
        fireEvent.click(tryAgainButton);
        expect(resetMock).toHaveBeenCalled();
    });
});
