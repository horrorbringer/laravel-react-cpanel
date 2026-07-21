import { Link, usePage } from '@inertiajs/react';
import { PenLine, StickyNoteIcon } from 'lucide-react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { create as createPost } from '@/actions/App/Http/Controllers/PostController';
import { index as postsIndex } from '@/routes/posts';
import { cn } from '@/lib/utils';
import type { Auth, NavItem } from '@/types';

const defaultNavItems: NavItem[] = [
    {
        title: 'Posts',
        href: postsIndex(),
        icon: StickyNoteIcon,
    },
];

export function AppBottomNav({ items = defaultNavItems }: { items?: NavItem[] }) {
    const { isCurrentOrParentUrl } = useCurrentUrl();
    const { auth } = usePage<{ auth: Auth }>().props;

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
            {auth.user && (
                <Link
                    href={createPost().url}
                    className="absolute -top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/30 transition-transform active:scale-90"
                >
                    <PenLine className="h-5 w-5" />
                </Link>
            )}

            <nav
                className={cn(
                    'rounded-t-2xl bg-sidebar/95 backdrop-blur-md supports-backdrop-filter:bg-sidebar/80',
                    'shadow-[0_-4px_20px_-6px_rgba(0,0,0,0.15)] dark:shadow-[0_-4px_20px_-6px_rgba(0,0,0,0.4)]',
                )}
            >
                <div className="flex h-20 items-center justify-around pb-[env(safe-area-inset-bottom,0px)]">
                    {items.map((item) => {
                        const active = item.isActive ?? (isCurrentOrParentUrl(item.href) && !item.onClick);
                        const Icon = item.icon;
                        const classes = cn(
                            'relative flex cursor-pointer flex-col items-center gap-1 border-none bg-transparent px-4 pt-1 text-[11px] font-medium transition-all duration-200',
                            active
                                ? 'text-sidebar-primary'
                                : 'text-muted-foreground hover:text-foreground',
                        );

                        if (item.onClick) {
                            return (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={item.onClick}
                                    className={classes}
                                >
                                    {active && (
                                        <span className="absolute -top-0.5 h-1 w-5 rounded-full bg-sidebar-primary" />
                                    )}
                                    {Icon && (
                                        <Icon
                                            className={cn(
                                                'h-6 w-6 transition-all duration-200',
                                                active && 'scale-110',
                                            )}
                                        />
                                    )}
                                    <span className="transition-colors duration-200">
                                        {item.title}
                                    </span>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={classes}
                            >
                                {active && (
                                    <span className="absolute -top-0.5 h-1 w-5 rounded-full bg-sidebar-primary" />
                                )}
                                {Icon && (
                                    <Icon
                                        className={cn(
                                            'h-6 w-6 transition-all duration-200',
                                            active && 'scale-110',
                                        )}
                                    />
                                )}
                                <span className="transition-colors duration-200">
                                    {item.title}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
