import { Head, Link, router } from '@inertiajs/react';
import { Plus, Shield, ShieldOff, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import { ConfirmDialog } from '@/components/confirm-dialog';
import Heading from '@/components/heading';
import { SearchInput } from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { BreadcrumbItem } from '@/types';

type User = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at: string | null;
    posts_count: number;
    comments_count: number;
    likes_count: number;
    created_at: string;
};

type PaginatedUsers = {
    data: User[];
    meta: { total: number };
};

type Filters = {
    search?: string;
};

export default function AdminUsersIndex({
    users,
    filters,
}: {
    users: PaginatedUsers;
    filters: Filters;
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        debounce.current = setTimeout(() => {
            if ((filters.search ?? '') === search) {
return;
}

            router.get(
                UserController.index().url,
                { search: search || undefined },
                { preserveState: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(debounce.current);
    }, [search]);

    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const allIds = users.data.map((u) => u.id);
    const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(allIds));
        }
    };

    const toggleSelect = (id: number) => {
        const next = new Set(selectedIds);
        next.has(id) ? next.delete(id) : next.add(id);
        setSelectedIds(next);
    };

    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

    return (
        <>
            <Head title="Admin - Users" />

            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Heading title="Users" description="Manage all users on the platform" />
                    <Link href={UserController.create().url}>
                        <Button>
                            <Plus className="mr-1.5 size-4" />
                            New User
                        </Button>
                    </Link>
                </div>

                <div className="mt-6 max-w-sm">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search users..."
                    />
                </div>

                <div className="mt-6">
                    {users.data.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            {search ? 'No users match your search.' : 'No users yet.'}
                        </p>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-10">
                                            <Checkbox
                                                checked={allSelected}
                                                onCheckedChange={toggleSelectAll}
                                                aria-label="Select all"
                                            />
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Verified</TableHead>
                                        <TableHead className="text-center">Posts</TableHead>
                                        <TableHead className="text-center">Comments</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedIds.has(user.id)}
                                                    onCheckedChange={() => toggleSelect(user.id)}
                                                    aria-label={`Select ${user.name}`}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {user.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                {user.is_admin ? (
                                                    <Badge>
                                                        <Shield className="mr-1 size-3" />
                                                        Admin
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">User</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {user.email_verified_at ? (
                                                    <Badge variant="outline">Verified</Badge>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">
                                                        Unverified
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground">
                                                {user.posts_count ?? 0}
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground">
                                                {user.comments_count ?? 0}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {user.created_at
                                                    ? new Date(
                                                          user.created_at,
                                                      ).toLocaleDateString()
                                                    : '—'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={UserController.edit({
                                                            user: user.id,
                                                        }).url}
                                                    >
                                                        <Button variant="outline" size="sm">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => setDeleteTarget(user)}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}
                </div>
            </div>

            <ConfirmDialog
                open={deleteTarget !== null}
                onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
                title={`Delete user "${deleteTarget?.name ?? ''}"`}
                description="This will also delete their posts and comments. This action cannot be undone."
                confirmLabel="Delete"
                destructive
                onConfirm={() => {
                    if (deleteTarget !== null) {
                        router.delete(UserController.destroy({ user: deleteTarget.id }).url);
                    }
                }}
            />
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Users', href: '/admin/users' },
];

AdminUsersIndex.layout = {
    breadcrumbs,
};
