import { Link } from '@inertiajs/react';
import { StickyNoteIcon } from 'lucide-react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { index as postsIndex } from '@/routes/posts';
import type { NavItem } from '@/types';

const defaultNavItems: NavItem[] = [
    {
        title: 'Posts',
        href: postsIndex(),
        icon: StickyNoteIcon,
    },
];

export function AppBottomNav({ items = defaultNavItems }: { items?: NavItem[] }) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 block border-t border-sidebar-border/80 bg-sidebar/95 backdrop-blur-xs supports-backdrop-filter:bg-sidebar/80 lg:hidden">
            <div className="flex h-16 items-center justify-around pb-[env(safe-area-inset-bottom,0px)]">
                {items.map((item) => {
                    const active = isCurrentOrParentUrl(item.href);

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 text-xs font-medium transition-colors ${
                                active
                                    ? 'text-sidebar-accent-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {item.icon && (
                                <item.icon
                                    className={`h-5 w-5 ${
                                        active ? 'text-sidebar-primary' : ''
                                    }`}
                                />
                            )}
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
