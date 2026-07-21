import { Head, Link, router } from '@inertiajs/react';
import { Eye, Heart, MessageCircle, Bookmark } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import PostController from '@/actions/App/Http/Controllers/PostController';
import Heading from '@/components/heading';
import { SearchInput } from '@/components/search-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

    const deletePost = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(PostController.destroy({ post: id }).url);
        }
    };

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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">Views</TableHead>
                                    <TableHead className="text-center">Likes</TableHead>
                                    <TableHead className="text-center">Comments</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.data.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="max-w-md">
                                            <div className="font-medium">
                                                {post.title}
                                            </div>
                                            <div className="line-clamp-1 text-sm text-muted-foreground">
                                                {stripHtml(post.content)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {post.published ? (
                                                <Badge>Published</Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Draft
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center text-muted-foreground">
                                            <span className="inline-flex items-center gap-1 text-xs">
                                                <Eye className="size-3.5" />
                                                {post.views ?? 0}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center text-muted-foreground">
                                            <span className="inline-flex items-center gap-1 text-xs">
                                                <Heart className="size-3.5" />
                                                {post.likes_count ?? 0}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center text-muted-foreground">
                                            <span className="inline-flex items-center gap-1 text-xs">
                                                <MessageCircle className="size-3.5" />
                                                {post.comments_count ?? 0}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {post.created_at
                                                ? new Date(
                                                      post.created_at,
                                                  ).toLocaleDateString()
                                                : '—'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={PostController.edit(
                                                            {
                                                                post: post.id,
                                                            },
                                                        ).url}
                                                    >
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        deletePost(post.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
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
