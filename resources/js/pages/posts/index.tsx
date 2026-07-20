import { Head, Link, router } from '@inertiajs/react';
import PostController from '@/actions/App/Http/Controllers/PostController';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

export default function PostsIndex({ posts }: { posts: PaginatedPosts }) {
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

                <div className="mt-6 space-y-4">
                    {posts.data.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No posts yet.
                        </p>
                    ) : (
                        posts.data.map((post) => (
                            <Card key={post.id}>
                                <CardContent className="flex items-start justify-between gap-4 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {post.title}
                                            </span>
                                            {post.published ? (
                                                <Badge>Published</Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Draft
                                                </Badge>
                                            )}
                                        </div>
                                        <div
                                            className="prose prose-sm dark:prose-invert line-clamp-2 max-w-none text-sm text-muted-foreground"
                                            dangerouslySetInnerHTML={{
                                                __html: post.content,
                                            }}
                                        />
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Link
                                                href={
                                                    PostController.edit({
                                                        post: post.id,
                                                    }).url
                                                }
                                            >
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        'Are you sure you want to delete this post?',
                                                    )
                                                ) {
                                                    router.delete(
                                                        PostController.destroy({
                                                            post: post.id,
                                                        }).url,
                                                    );
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
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
