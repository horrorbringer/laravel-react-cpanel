import { AppBottomNav } from '@/components/app-bottom-nav';
import { StickyNoteIcon } from 'lucide-react';
import { index as postsIndex } from '@/routes/posts';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
    { title: 'Posts', href: postsIndex(), icon: StickyNoteIcon },
];

export default function AppContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="pb-20 lg:pb-0">{children}</div>
            <AppBottomNav items={navItems} />
        </>
    );
}
