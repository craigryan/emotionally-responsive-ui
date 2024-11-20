import React from 'react';
import type { Preview } from "@storybook/react";
import { NextIntlClientProvider } from 'next-intl';

import enJson from '@/messages/en.json';

// Apply the global styles to all stories
import "../lib/styles/globals.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    tags: ["autodocs"],
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale={'en'} messages={enJson}>
        <div className="theme-cp">
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],

};

export default preview;
