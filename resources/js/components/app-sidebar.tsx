import { Link, usePage } from '@inertiajs/react';
import { Home, PenLine, Shield, StickyNoteIcon } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { create as createPost, index as postsIndex } from '@/routes/posts';
import { home } from '@/routes';
import type { Auth, NavItem } from '@/types';

export function AppSidebar() {
    const { auth = {} as Auth } = usePage<{ auth: Auth }>().props;

    const navItems: NavItem[] = [
        { title: 'Home', href: home(), icon: Home },
        { title: 'My Posts', href: postsIndex(), icon: StickyNoteIcon },
        { title: 'New Post', href: createPost(), icon: PenLine },
        ...(auth?.user?.is_admin
            ? [{ title: 'Admin', href: '/admin/posts', icon: Shield }]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={postsIndex()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
