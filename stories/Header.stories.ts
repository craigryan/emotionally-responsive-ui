import { Header } from './Header';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Example/Header',
    component: Header,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Header>;

// Required to be default by Storybook
// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        user: {
            name: 'Jane Doe',
        },
    },
};

export const LoggedOut: Story = {};
