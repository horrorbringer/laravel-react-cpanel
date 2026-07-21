import { usePage } from '@inertiajs/react';
import { Home, Search, User } from 'lucide-react';
import { AppBottomNav } from '@/components/app-bottom-nav';
import { home, login } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import type { Auth, NavItem } from '@/types';

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<{ auth: Auth }>().props;

    const navItems: NavItem[] = [
        { title: 'Home', href: home(), icon: Home },
        { title: 'Search', href: home(), icon: Search },
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
