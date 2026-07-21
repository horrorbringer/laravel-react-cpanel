import { createInertiaApp } from '@inertiajs/react';
import { registerSW } from 'virtual:pwa-register';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { VisitLoader } from '@/components/visit-loader';
import { initializeTheme } from '@/hooks/use-appearance';
import AppContentLayout from '@/layouts/app/app-content-layout';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import WelcomeLayout from '@/layouts/welcome-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

registerSW({ immediate: true });

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return WelcomeLayout;
            case name === 'posts/show':
                return null;
            case name.startsWith('posts/'):
                return AppContentLayout;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
                <VisitLoader />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
        delay: 250,
        showSpinner: false,
    },
});

// This will set light / dark mode on load...
initializeTheme();
