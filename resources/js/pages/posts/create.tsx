import { Head } from '@inertiajs/react';
import PostController from '@/actions/App/Http/Controllers/PostController';
import PostForm from '@/pages/posts/post-form';
import type { BreadcrumbItem } from '@/types';

export default function PostsCreate() {
    return (
        <>
            <Head title="Create post" />
            <PostForm action={PostController.store()} />
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Posts', href: '/posts' },
    { title: 'Create', href: '/posts/create' },
];

PostsCreate.layout = {
    breadcrumbs,
};
