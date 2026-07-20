import { Head, Link } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppearance } from '@/hooks/use-appearance';
import { home } from '@/routes';

type Post = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    author: string;
    readingTime: string;
    created_at: string;
};

export default function PostShow({ post }: { post: Post }) {
    const { resolvedAppearance, updateAppearance } = useAppearance();

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
                <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

                <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
                    <article>
                        <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                            {post.title}
                        </h1>
                        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                            {post.author && (
                                <>
                                    <span className="font-medium text-foreground">
                                        {post.author}
                                    </span>
                                    <span>·</span>
                                </>
                            )}
                            {formattedDate && <span>{formattedDate}</span>}
                            {post.readingTime && (
                                <>
                                    <span>·</span>
                                    <span>{post.readingTime}</span>
                                </>
                            )}
                        </div>

                        <Separator className="my-8" />

                        <div
                            className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>
                </main>

                <footer className="border-t px-4 py-6 text-center text-sm text-muted-foreground sm:px-6">
                    Knowledge — a quiet place to read and write. Built with
                    Laravel, Inertia & React.
                </footer>
            </div>
        </>
    );
}
