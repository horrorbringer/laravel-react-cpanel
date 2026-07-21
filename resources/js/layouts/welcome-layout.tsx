import { router, usePage } from '@inertiajs/react';
import { Home, Search, User } from 'lucide-react';
import { AppBottomNav } from '@/components/app-bottom-nav';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { home, login } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import type { Auth, NavItem } from '@/types';

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const { isCurrentUrl } = useCurrentUrl();

    const handleHome = () => {
        router.get(home().url, {}, { preserveState: false });
    };

    const handleSearch = () => {
        const el = document.getElementById('search-section');

        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });

            const input = el.querySelector('input');

            setTimeout(() => input?.focus(), 400);
        }
    };

    const navItems: NavItem[] = [
        { title: 'Home', href: home(), icon: Home, onClick: handleHome, isActive: isCurrentUrl(home()) },
        { title: 'Search', href: home(), icon: Search, onClick: handleSearch },
        {
            title: 'Profile',
            href: auth.user ? profileEdit() : login(),
            icon: User,
        },
    ];

    return (
        <>
            {children}
            <AppBottomNav items={navItems} />
        </>
    );
}
