import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { PostHogProvider } from 'posthog-js/react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const options = {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: '2025-05-24',
} as const;

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
                <App {...props} />
            </PostHogProvider>,
        );
    },
    progress: {
        color: '#FDE047',
    },
});

// This will set light / dark mode on load...
initializeTheme();
