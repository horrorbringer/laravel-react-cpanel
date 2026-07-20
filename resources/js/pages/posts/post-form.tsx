import { Form, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PostEditor from '@/components/post-editor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PostController from '@/actions/App/Http/Controllers/PostController';
import type { RouteDefinition } from '@/wayfinder';

type Post = {
    id?: number;
    title?: string;
    content?: string;
    published?: boolean;
};

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function PostForm({
    action,
    post,
}: {
    action: RouteDefinition<'post' | 'put'>;
    post?: Post;
}) {
    const isEditing = Boolean(post?.id);
    const [content, setContent] = useState(post?.content ?? '');
    const [title, setTitle] = useState(post?.title ?? '');
    const [published, setPublished] = useState(
        Boolean(post?.published),
    );
    const [status, setStatus] = useState<SaveStatus>('idle');
    const [draftId, setDraftId] = useState<number | undefined>(post?.id);

    const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const firstRun = useRef(true);

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }

        const hasContent = title.trim() !== '' || content.trim() !== '';

        if (!hasContent) {
            return;
        }

        clearTimeout(debounce.current);
        setStatus('saving');

        debounce.current = setTimeout(() => {
            const payload = {
                title: title.trim() === '' ? null : title,
                content: content.trim() === '' ? null : content,
            };

            if (draftId) {
                router.put(
                    PostController.autosaveUpdate({ post: draftId })
                        .url,
                    payload,
                    {
                        preserveScroll: true,
                        preserveState: true,
                        errorBag: 'autosave',
                        onSuccess: () => setStatus('saved'),
                        onError: () => setStatus('error'),
                    },
                );

                return;
            }

            router.post(
                PostController.autosaveStore().url,
                payload,
                {
                    preserveScroll: true,
                    preserveState: true,
                    errorBag: 'autosave',
                    onSuccess: (response: unknown) => {
                        const data = (response as { data?: { id?: number }; id?: number });
                        const id = data.data?.id ?? data.id;
                        if (typeof id === 'number') {
                            setDraftId(id);
                        }
                        setStatus('saved');
                    },
                    onError: () => setStatus('error'),
                },
            );
        }, 1000);

        return () => clearTimeout(debounce.current);
    }, [title, content, draftId]);

    const statusLabel: Record<SaveStatus, string> = {
        idle: '',
        saving: 'Saving draft…',
        saved: 'Draft saved',
        error: 'Could not save draft',
    };

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
                <Heading
                    title={isEditing ? 'Edit post' : 'Create post'}
                    description={
                        isEditing
                            ? 'Update the post details'
                            : 'Add a new blog post'
                    }
                />
                <span
                    aria-live="polite"
                    className="text-sm text-muted-foreground"
                >
                    {statusLabel[status]}
                </span>
            </div>

            <Form
                action={
                    draftId
                        ? PostController.update({ post: draftId }).url
                        : action.url
                }
                method={
                    draftId
                        ? PostController.update({ post: draftId }).method
                        : action.method
                }
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
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                placeholder="Post title"
                                required
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <PostEditor
                                value={content}
                                onChange={setContent}
                                error={errors.content}
                            />
                            <input
                                type="hidden"
                                name="content"
                                value={content}
                            />
                            <input
                                type="hidden"
                                name="published"
                                value={published ? '1' : '0'}
                            />
                            <InputError message={errors.content} />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="published"
                                checked={published}
                                onCheckedChange={(checked) =>
                                    setPublished(Boolean(checked))
                                }
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
