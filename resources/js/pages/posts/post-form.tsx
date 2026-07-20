import { Form } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PostEditor from '@/components/post-editor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RouteDefinition } from '@/wayfinder';

type Post = {
    id?: number;
    title?: string;
    content?: string;
    published?: boolean;
};

export default function PostForm({
    action,
    post,
}: {
    action: RouteDefinition<'post' | 'put'>;
    post?: Post;
}) {
    const isEditing = Boolean(post?.id);
    const [content, setContent] = useState(post?.content ?? '');

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <Heading
                title={isEditing ? 'Edit post' : 'Create post'}
                description={
                    isEditing
                        ? 'Update the post details'
                        : 'Add a new blog post'
                }
            />

            <Form
                action={action.url}
                method={action.method}
                options={{ preserveScroll: true }}
                className="mt-6 space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={post?.title}
                                placeholder="Post title"
                                required
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <PostEditor
                                value={post?.content}
                                onChange={setContent}
                                error={errors.content}
                            />
                            <input
                                type="hidden"
                                name="content"
                                value={content}
                            />
                            <InputError message={errors.content} />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="published"
                                name="published"
                                value="1"
                                defaultChecked={post?.published}
                            />
                            <Label htmlFor="published">Published</Label>
                        </div>

                        <Button type="submit" disabled={processing}>
                            {processing
                                ? 'Saving...'
                                : isEditing
                                  ? 'Update post'
                                  : 'Create post'}
                        </Button>
                    </>
                )}
            </Form>
        </div>
    );
}
