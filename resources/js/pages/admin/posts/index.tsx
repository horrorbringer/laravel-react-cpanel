import { Head, Link, router } from '@inertiajs/react';
import { StickyNoteIcon, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
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

type Post = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    user: { id: number; name: string };
    likes_count: number;
    comments_count: number;
    created_at: string;
};

type PaginatedPosts = {
    data: Post[];
    meta: { total: number };
};

type Filters = {
    search?: string;
};

export default function AdminPostsIndex({
    posts,
    filters,
}: {
    posts: PaginatedPosts;
    filters: Filters;
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        debounce.current = setTimeout(() => {
            if ((filters.search ?? '') === search) return;

            router.get(
                PostController.index().url,
                { search: search || undefined },
                { preserveState: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(debounce.current);
    }, [search]);

    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const allIds = posts.data.map((p) => p.id);
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

    const bulkDelete = () => {
        const ids = Array.from(selectedIds);
        if (ids.length === 0) return;
        if (!confirm(`Delete ${ids.length} post${ids.length > 1 ? 's' : ''}?`)) return;

        router.post(PostController.bulkDestroy().url, { ids }, {
            onSuccess: () => setSelectedIds(new Set()),
        });
    };

    return (
        <>
            <Head title="Admin - Posts" />

            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <Heading title="All Posts" description="Manage all posts on the platform" />

                <div className="mt-6 max-w-sm">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search posts..."
                    />
                </div>

                <div className="mt-6">
                    {posts.data.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            {search ? 'No posts match your search.' : 'No posts yet.'}
                        </p>
                    ) : (
                        <>
                            {selectedIds.size > 0 && (
                                <div className="mb-4 flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-2.5">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedIds.size} selected
                                    </span>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={bulkDelete}
                                    >
                                        <Trash2 className="mr-1.5 size-4" />
                                        Delete selected
                                    </Button>
                                </div>
                            )}
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
                                        <TableHead>Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-center">Likes</TableHead>
                                        <TableHead className="text-center">Comments</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {posts.data.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedIds.has(post.id)}
                                                    onCheckedChange={() => toggleSelect(post.id)}
                                                    aria-label={`Select ${post.title}`}
                                                />
                                            </TableCell>
                                            <TableCell className="max-w-md">
                                                <div className="font-medium">{post.title}</div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {post.user?.name ?? 'Unknown'}
                                            </TableCell>
                                            <TableCell>
                                                {post.published ? (
                                                    <Badge>Published</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Draft</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground">
                                                {post.likes_count ?? 0}
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground">
                                                {post.comments_count ?? 0}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {post.created_at
                                                    ? new Date(post.created_at).toLocaleDateString()
                                                    : '—'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (confirm('Delete this post?')) {
                                                            router.delete(
                                                                PostController.destroy({ post: post.id }).url,
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/posts' },
    { title: 'Posts', href: '/admin/posts' },
];

AdminPostsIndex.layout = {
    breadcrumbs,
};
