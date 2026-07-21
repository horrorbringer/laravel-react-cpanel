import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { destroy } from '@/routes/comments';
import { store } from '@/routes/posts/comments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Comment = {
    id: number;
    body: string;
    author: string;
    created_at: string;
    is_owner: boolean;
};

type Props = {
    postId: number;
    comments: Comment[];
};

export function CommentsSection({ postId, comments }: Props) {
    const { auth } = usePage().props;
    const [body, setBody] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!body.trim()) return;

        router.post(
            store({ post: postId }).url,
            { body },
            { preserveScroll: true, onSuccess: () => setBody('') },
        );
    };

    const handleDelete = (commentId: number) => {
        if (!confirm('Delete this comment?')) return;

        router.delete(destroy({ comment: commentId }).url, {
            preserveScroll: true,
        });
    };

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">
                Comments ({comments.length})
            </h3>

            {auth?.user && (
                <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                    <Input
                        type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1"
                    />
                    <Button type="submit" size="sm">
                        Post
                    </Button>
                </form>
            )}

            {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No comments yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="rounded-lg border border-border/70 p-3"
                        >
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    {comment.author}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                        {comment.created_at}
                                    </span>
                                    {comment.is_owner && (
                                        <button
                                            onClick={() =>
                                                handleDelete(comment.id)
                                            }
                                            className="text-xs text-muted-foreground hover:text-destructive"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-foreground/90">
                                {comment.body}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
