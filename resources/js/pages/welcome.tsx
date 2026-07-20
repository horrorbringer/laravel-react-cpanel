import { Head, Link, usePage } from '@inertiajs/react';
import { Moon, PenLine, Sun } from 'lucide-react';
import {
    create as createPost,
    index as postsIndex,
} from '@/actions/App/Http/Controllers/PostController';
import { show as showPost } from '@/actions/App/Http/Controllers/PostController';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppearance } from '@/hooks/use-appearance';
import { login, register } from '@/routes';
import type { Auth } from '@/types';

type Article = {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readingTime: string;
    tag: string;
};

function ArticleMeta({ article }: { article: Article }) {
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
                {article.author}
            </span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readingTime}</span>
        </div>
    );
}

export default function Welcome() {
    const { auth, articles } = usePage<{
        auth: Auth;
        articles: Article[];
    }>().props;
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const featured: Article | undefined = articles[0];
    const rest: Article[] = articles.slice(1);

    return (
        <>
            <Head title="Knowledge" />

            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <header className="sticky top-0 z-10 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
                        <div className="flex min-w-0 items-center gap-5">
                            <AppLogo />
                        </div>
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
                            {auth.user ? (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link href={postsIndex()}>Posts</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={createPost()}>
                                            <PenLine className="size-4" />
                                            Write
                                        </Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        asChild
                                        className="hidden sm:inline-flex"
                                    >
                                        <Link href={login()}>Log in</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={register()}>
                                            Get started
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
                    {featured ? (
                        <section>
                            <Link
                                href={showPost({ post: featured.id })}
                                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                            >
                                <h1 className="font-serif text-2xl leading-[1.2] font-bold tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                                    {featured.title}
                                </h1>
                                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                                    {featured.excerpt}
                                </p>
                                <div className="mt-5">
                                    <ArticleMeta article={featured} />
                                </div>
                            </Link>
                        </section>
                    ) : (
                        <section>
                            <p className="text-lg text-muted-foreground">
                                No published posts yet. Check back soon.
                            </p>
                        </section>
                    )}

                    {rest.length > 0 && (
                        <div className="mt-12 divide-y divide-border/70">
                            {rest.map((article) => (
                                <Link
                                    key={article.id}
                                    href={showPost({ post: article.id })}
                                    className="group block py-8 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50"
                                >
                                    <h2 className="font-serif text-xl leading-snug font-bold tracking-tight transition-colors group-hover:text-primary">
                                        {article.title}
                                    </h2>
                                    <p className="mt-2 line-clamp-2 text-base leading-relaxed text-muted-foreground">
                                        {article.excerpt}
                                    </p>
                                    <div className="mt-4">
                                        <ArticleMeta article={article} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <Separator className="my-12" />

                    <section className="rounded-xl border border-border/70 bg-muted/30 p-8 text-center">
                        <h2 className="font-serif text-2xl font-bold tracking-tight">
                            Start writing your own knowledge base
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                            Create, edit, and publish posts from a clean
                            editor. Your words, organized and readable.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <Button size="lg" asChild>
                                <Link href={postsIndex()}>
                                    Browse all posts
                                </Link>
                            </Button>
                            {!auth.user && (
                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                >
                                    <Link href={register()}>
                                        Create account
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </section>
                </main>

                <footer className="border-t border-border/70 px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
                    Knowledge — a quiet place to read and write. Built with
                    Laravel, Inertia & React.
                </footer>
            </div>
        </>
    );
}
