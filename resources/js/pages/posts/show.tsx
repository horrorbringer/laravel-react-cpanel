import { Head, Link, usePage } from '@inertiajs/react';
import { Eye, Moon, Sun } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { BookmarkButton } from '@/components/bookmark-button';
import { CommentsSection } from '@/components/comments-section';
import { LikeButton } from '@/components/like-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppearance } from '@/hooks/use-appearance';
import { home } from '@/routes';
import type { Auth } from '@/types';

type Post = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    author: string;
    readingTime: string;
    created_at: string;
};

type Engagement = {
    views: number;
    likes_count: number;
    is_liked: boolean;
    is_bookmarked: boolean;
};

type Comment = {
    id: number;
    body: string;
    author: string;
    created_at: string;
    is_owner: boolean;
};

function initials(name: string): string {
    return name
        .split(' ')
        .map((part) => part.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export default function PostShow({
    post,
    engagement,
    comments,
}: {
    post: Post;
    engagement: Engagement;
    comments: Comment[];
}) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const { auth } = usePage<{ auth: Auth }>().props;

    const formattedDate = post.created_at
        ? new Date(post.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : '';

    return (
        <>
            <Head title={post.title} />

            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <header className="sticky top-0 z-10 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
                        <AppLogo />
                        <div className="flex shrink-0 items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Toggle theme"
                                onClick={() =>
                                    updateAppearance(
                                        resolvedAppearance === 'dark'
                                            ? 'light'
                                            : 'dark',
                                    )
                                }
                                className="h-9 w-9"
                            >
                                {resolvedAppearance === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </Button>
                            <Button variant="link" asChild className="px-0">
                                <Link href={home()}>← All articles</Link>
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-[680px] px-4 py-12 sm:px-6 sm:py-16">
                    <article>
                        <h1 className="font-serif text-2xl leading-[1.2] font-bold tracking-tight sm:text-3xl">
                            {post.title}
                        </h1>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
                                {initials(post.author || 'A')}
                            </div>
                            <div className="text-sm leading-tight">
                                <div className="font-medium text-foreground">
                                    {post.author}
                                </div>
                                <div className="text-muted-foreground">
                                    {formattedDate}
                                    {post.readingTime && (
                                        <> · {post.readingTime}</>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {engagement.views}
                            </span>
                        </div>

                        <Separator className="my-8" />

                        <div
                            className="prose prose-lg dark:prose-invert max-w-none font-serif prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-p:leading-relaxed prose-img:mx-auto prose-img:rounded-md"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>

                    <Separator className="my-8" />

                    <div className="flex items-center gap-2">
                        <LikeButton
                            postId={post.id}
                            isLiked={engagement.is_liked}
                            count={engagement.likes_count}
                        />

                        {auth?.user && (
                            <BookmarkButton
                                postId={post.id}
                                isBookmarked={engagement.is_bookmarked}
                            />
                        )}
                    </div>

                    <Separator className="my-8" />

                    <CommentsSection postId={post.id} comments={comments} />
                </main>

                <footer className="border-t border-border/70 px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
                    Knowledge — a quiet place to read and write. Built with
                    Laravel, Inertia & React.
                </footer>
            </div>
        </>
    );
}
