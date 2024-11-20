import type { Config } from 'tailwindcss';

// Should import designSystemConfig from a common component repo eg '@my-shared/dist/tailwind.config';

const designSystemConfig = {
    theme: {
        extend: {
            boxShadow: {
                gradient: '0 0 10px 0 rgba(146, 228, 253, 0.50)',
                table: '0px 0px 10px 0px rgba(0, 0, 0, 0.10)',
            },
            colors: {
                error: 'var(--color-error)',
                success: 'var(--color-success)',
                white: 'var(--color-white)',
            },
            gridTemplateRows: {
                8: 'repeat(8, minmax(0, 1fr))',
                9: 'repeat(9, minmax(0, 1fr))',
            },
            transitionProperty: {
                right: 'position',
            },
            spacing: {
                1: '5px',
                2: '10px',
                4: '15px',
                5: '20px',
                6: '25px',
                8: '30px',
                10: '40px',
                12: '50px',
            },
            borderRadius: {
                1: 'var(--spacing-1)',
            },
        },
        fontFamily: {
            body: '"DM Sans", sans-serif',
            sans: '"DM Sans", sans-serif',
            h2: '"Besley", sans-serif',
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
        },
        screens: {
            mobile: '320px',
            tablet: '834px',
            laptop: '1290px',
            desktop: '1440px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '3rem',
                mobile: '3rem',
                tablet: '5rem',
                laptop: '3rem',
                desktop: '10rem',
            },
            screens: {
                mobile: '100%',
                tablet: '100%',
                laptop: '1290px',
                desktop: '1440px',
            },
        },
    },
    plugins: [],
};

const config: Config = {
    ...designSystemConfig,
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx,scss}', './lib/**/*.{js,ts,jsx,tsx,mdx,scss}'],
    theme: {
        ...designSystemConfig.theme,
        extend: {
            ...designSystemConfig.theme.extend,
            colors: {
                ...designSystemConfig.theme.extend.colors,
            },
            backgroundImage: {},
            spacing: {
                ...designSystemConfig.theme.extend.spacing,
            },
            borderRadius: {
                ...designSystemConfig.theme.extend.borderRadius,
            },
            boxShadow: {
                ...designSystemConfig.theme.extend.boxShadow,
            },
        },
    },
    plugins: [...designSystemConfig.plugins],
    corePlugins: { preflight: false },
};

// Required to be default by Tailwind
// eslint-disable-next-line import/no-default-export
export default config;
