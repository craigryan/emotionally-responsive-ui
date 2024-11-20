import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import { ConditionallyRender } from './ConditionallyRender';

describe('ConditionallyRender', () => {
    it('render content when condition is true', () => {
        const { getByText } = render(<ConditionallyRender condition={true} show={<div>show</div>} />);

        const show = getByText('show');

        expect(show).toBeInTheDocument();
        expect(show.textContent).toBe('show');
    });

    it('render alternative content when condition is false', () => {
        const { getByText } = render(
            <ConditionallyRender condition={false} show={<div>show</div>} elseShow={<div>elseShow</div>} />,
        );

        const elseShow = getByText('elseShow');

        expect(elseShow).toBeInTheDocument();
        expect(elseShow.textContent).toBe('elseShow');
    });
});
