import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle, Eye, Heart, MessageCircle, MoreVertical, Pencil, Trash2, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import PostController from '@/actions/App/Http/Controllers/PostController';
import { ConfirmDialog } from '@/components/confirm-dialog';
import Heading from '@/components/heading';
import { SearchInput } from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table } from '@/components/motion/table';
import type { TableColumn } from '@/components/motion/table';
import type { BreadcrumbItem } from '@/types';

type Post = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    views: number;
    likes_count: number;
    comments_count: number;
    created_at: string;
};

type PaginatedPosts = {
    data: Post[];
};

type Filters = {
    search?: string;
};

function stripHtml(html: string | null | undefined): string {
    return (html ?? '').replace(/<[^>]*>/g, '');
}

export default function PostsIndex({
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

    const allIds = posts.data.map((p) => String(p.id));
    const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

    const bulkAction = (action: string) => {
        const ids = selectedIds.map(Number);

        if (ids.length === 0) {
return;
}

        if (action === 'delete') {
            setBulkDeleteOpen(true);
            return;
        }

        const routes: Record<string, ReturnType<typeof PostController.bulkDestroy>> = {
            publish: PostController.bulkPublish(),
            unpublish: PostController.bulkUnpublish(),
            delete: PostController.bulkDestroy(),
        };

        router.post(routes[action].url, { ids }, {
            onSuccess: () => setSelectedIds([]),
        });
    };

    const columns: TableColumn<Post>[] = [
        {
            key: 'title',
            header: 'Title',
            cell: (post) => (
                <div className="max-w-md">
                    <div className="font-medium">{post.title}</div>
                    <div className="line-clamp-1 text-sm text-muted-foreground">
                        {stripHtml(post.content)}
                    </div>
                </div>
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
            key: 'views',
            header: 'Views',
            align: 'center',
            width: '80px',
            cell: (post) => (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="size-3.5" />
                    {post.views ?? 0}
                </span>
            ),
        },
        {
            key: 'likes_count',
            header: 'Likes',
            align: 'center',
            width: '80px',
            cell: (post) => (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="size-3.5" />
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
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageCircle className="size-3.5" />
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                                <MoreVertical className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link
                                    href={PostController.edit({ post: post.id }).url}
                                >
                                    <Pencil className="size-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={() => setDeleteTarget(post.id)}
                            >
                                <Trash2 className="size-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Posts" />

            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4">
                    <Heading
                        title="Posts"
                        description="Manage your blog posts"
                    />
                    <Button asChild>
                        <Link href={PostController.create().url}>New post</Link>
                    </Button>
                </div>

                <div className="mt-6 max-w-sm">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search your posts"
                    />
                </div>

                <div className="mt-6">
                    {posts.data.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            {search
                                ? 'No posts match your search.'
                                : 'No posts yet.'}
                        </p>
                    ) : (
                        <>
                            {selectedIds.length > 0 && (
                                <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border bg-muted/50 px-4 py-2.5">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedIds.length} selected
                                    </span>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => bulkAction('publish')}
                                    >
                                        <CheckCircle className="mr-1.5 size-4" />
                                        Publish
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => bulkAction('unpublish')}
                                    >
                                        <XCircle className="mr-1.5 size-4" />
                                        Draft
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => bulkAction('delete')}
                                    >
                                        <Trash2 className="mr-1.5 size-4" />
                                        Delete
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
    {
        title: 'Posts',
        href: '/posts',
    },
];

PostsIndex.layout = {
    breadcrumbs,
};
