import { Head } from '@inertiajs/react';
import PostController from '@/actions/App/Http/Controllers/PostController';
import PostForm from '@/pages/posts/post-form';
import type { BreadcrumbItem } from '@/types';

type Post = {
    id: number;
    title?: string;
    content?: string;
    published?: boolean;
};

export default function PostsEdit({ post }: { post: Post }) {
    return (
        <>
            <Head title="Edit post" />
            <PostForm
                action={PostController.update({ post: post.id })}
                post={post}
            />
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Posts', href: '/posts' },
    { title: 'Edit', href: '#' },
];

PostsEdit.layout = {
    breadcrumbs,
};
