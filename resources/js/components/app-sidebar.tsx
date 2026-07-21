import { Link, usePage } from '@inertiajs/react';
import { Home, LayoutDashboard, PenLine, Shield, StickyNoteIcon, User } from 'lucide-react';
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
import { home } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as adminPostsIndex } from '@/routes/admin/posts';
import { index as adminUsersIndex } from '@/routes/admin/users';
import { create as createPost, index as postsIndex } from '@/routes/posts';
import type { Auth, NavItem } from '@/types';

export function AppSidebar() {
    const { auth = {} as Auth } = usePage<{ auth: Auth }>().props;

    const navItems: NavItem[] = [
        { title: 'Home', href: home().url, icon: Home },
        { title: 'My Posts', href: postsIndex().url, icon: StickyNoteIcon },
        { title: 'New Post', href: createPost().url, icon: PenLine },
        ...(auth?.user?.is_admin
            ? [
                  { title: 'Admin Dashboard', href: adminDashboard().url, icon: LayoutDashboard },
                  { title: 'Admin Users', href: adminUsersIndex().url, icon: User },
                  { title: 'Admin Posts', href: adminPostsIndex().url, icon: Shield },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={postsIndex().url} prefetch>
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
