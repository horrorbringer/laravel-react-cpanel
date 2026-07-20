import { Head, Link, router } from '@inertiajs/react';
import PostController from '@/actions/App/Http/Controllers/PostController';
import Heading from '@/components/heading';
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
    created_at: string;
};

type PaginatedPosts = {
    data: Post[];
};

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
}

export default function PostsIndex({ posts }: { posts: PaginatedPosts }) {
    const deletePost = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(PostController.destroy({ post: id }).url);
        }
    };

    return (
        <>
            <Head title="Posts" />

            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Posts"
                        description="Manage your blog posts"
                    />
                    <Button asChild>
                        <Link href={PostController.create().url}>New post</Link>
                    </Button>
                </div>

                <div className="mt-6">
                    {posts.data.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No posts yet.
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10">
                                        <span className="sr-only">
                                            Select
                                        </span>
                                    </TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.data.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>
                                            <Checkbox aria-label="Select post" />
                                        </TableCell>
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
