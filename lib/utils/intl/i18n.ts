import { getRequestConfig } from 'next-intl/server';

interface Messages {
    [key: string]: string;
}

interface MessagesModule {
    default: Messages;
}

// Required to be default by i18n
// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting, read from `cookies()`, `headers()`, etc.
    const locale = 'en';

    const messagesModule: MessagesModule = (await import(`../../../messages/${locale}.json`)) as MessagesModule;
    const messages: Messages = messagesModule.default;

    return {
        locale,
        messages,
    };
});
