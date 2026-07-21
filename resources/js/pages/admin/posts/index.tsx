import { Head, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import { ConfirmDialog } from '@/components/confirm-dialog';
import Heading from '@/components/heading';
import { SearchInput } from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/motion/table';
import type { TableColumn } from '@/components/motion/table';
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
            if ((filters.search ?? '') === search) {
return;
}

            router.get(
                PostController.index().url,
                { search: search || undefined },
                { preserveState: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(debounce.current);
    }, [search]);

    const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
    const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const bulkDelete = () => {
        if (selectedIds.length === 0) {
return;
}
        setBulkDeleteOpen(true);
    };

    const columns: TableColumn<Post>[] = [
        {
            key: 'title',
            header: 'Title',
            cell: (post) => (
                <div className="max-w-md">
                    <div className="font-medium">{post.title}</div>
                </div>
            ),
        },
        {
            key: 'author',
            header: 'Author',
            width: '160px',
            cell: (post) => (
                <span className="text-muted-foreground">
                    {post.user?.name ?? 'Unknown'}
                </span>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            width: '100px',
            cell: (post) =>
                post.published ? (
                    <Badge>Published</Badge>
                ) : (
                    <Badge variant="secondary">Draft</Badge>
                ),
        },
        {
            key: 'likes_count',
            header: 'Likes',
            align: 'center',
            width: '80px',
            cell: (post) => (
                <span className="text-muted-foreground">
                    {post.likes_count ?? 0}
                </span>
            ),
        },
        {
            key: 'comments_count',
            header: 'Comments',
            align: 'center',
            width: '100px',
            cell: (post) => (
                <span className="text-muted-foreground">
                    {post.comments_count ?? 0}
                </span>
            ),
        },
        {
            key: 'created_at',
            header: 'Created',
            width: '100px',
            cell: (post) => (
                <span className="text-muted-foreground">
                    {post.created_at
                        ? new Date(post.created_at).toLocaleDateString()
                        : '—'}
                </span>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            width: '80px',
            cell: (post) => (
                <div className="flex justify-end">
                    <Button
                        variant="destructive"
                        size="sm"
                                                onClick={() => setDeleteTarget(post.id)}
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            ),
        },
    ];

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
                            {selectedIds.length > 0 && (
                                <div className="mb-4 flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-2.5">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedIds.length} selected
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
                            <Table<Post>
                                data={posts.data}
                                columns={columns}
                                getRowId={(post) => String(post.id)}
                                selectable
                                selectedRowIds={selectedIds}
                                onSelectionChange={setSelectedIds}
                                rowHeight={56}
                                height={480}
                            />
                        </>
                    )}
                </div>
            </div>

            <ConfirmDialog
                open={deleteTarget !== null}
                onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
                title="Delete post"
                description="Are you sure you want to delete this post? This action cannot be undone."
                confirmLabel="Delete"
                destructive
                onConfirm={() => {
                    if (deleteTarget !== null) {
                        router.delete(PostController.destroy({ post: deleteTarget }).url);
                    }
                }}
            />

            <ConfirmDialog
                open={bulkDeleteOpen}
                onOpenChange={setBulkDeleteOpen}
                title={`Delete ${selectedIds.length} post${selectedIds.length > 1 ? 's' : ''}`}
                description={`Are you sure you want to delete ${selectedIds.length} selected post${selectedIds.length > 1 ? 's' : ''}? This action cannot be undone.`}
                confirmLabel="Delete"
                destructive
                onConfirm={() => {
                    const ids = selectedIds.map(Number);
                    router.post(PostController.bulkDestroy().url, { ids }, {
                        onSuccess: () => setSelectedIds([]),
                    });
                }}
            />
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
