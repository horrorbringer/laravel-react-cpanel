import { Head, Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { home } from '@/routes';

type Post = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    created_at: string;
};

export default function PostShow({ post }: { post: Post }) {
    return (
        <>
            <Head title={post.title} />

            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
                    <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
                        <AppLogo />
                        <Button variant="link" asChild className="px-0">
                            <Link href={home()}>← All articles</Link>
                        </Button>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
                    <article>
                        <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                            {post.title}
                        </h1>
                        <p className="mt-3 text-sm text-muted-foreground">
                            {post.created_at
                                ? new Date(post.created_at).toLocaleDateString(
                                      undefined,
                                      {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric',
                                      },
                                  )
                                : ''}
                        </p>

                        <Separator className="my-8" />

                        <div
                            className="prose prose-sm dark:prose-invert max-w-none"
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
