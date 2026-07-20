import { Head, Link, usePage } from '@inertiajs/react';
import { show as showPost } from '@/actions/App/Http/Controllers/PostController';
import AppLogo from '@/components/app-logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { dashboard, login, register } from '@/routes';
import { index as posts } from '@/routes/posts';
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

    const featured: Article | undefined = articles[0];
    const rest: Article[] = articles.slice(1);

    return (
        <>
            <Head title="Knowledge" />

            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
                    <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-6">
                            <AppLogo />
                            <nav className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
                                <a
                                    href="#articles"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Articles
                                </a>
                                <a
                                    href="#topics"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Topics
                                </a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-2">
                            {auth.user ? (
                                <Button asChild>
                                    <Link href={dashboard()}>Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild>
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

                <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
                    {featured ? (
                        <section className="border-b pb-10">
                        <Badge variant="secondary" className="mb-4">
                            Featured
                        </Badge>
                        <Link
                            href={showPost({ post: featured.id })}
                            className="group block"
                        >
                            <h1 className="text-3xl leading-tight font-bold tracking-tight group-hover:text-primary sm:text-4xl">
                                {featured.title}
                            </h1>
                                <p className="mt-4 text-lg text-muted-foreground">
                                    {featured.excerpt}
                                </p>
                                <div className="mt-5">
                                    <ArticleMeta article={featured} />
                                </div>
                            </Link>
                        </section>
                    ) : (
                        <section className="border-b pb-10">
                            <p className="text-lg text-muted-foreground">
                                No published posts yet. Check back soon.
                            </p>
                        </section>
                    )}

                    <section id="articles" className="py-10">
                        <div className="mb-6 flex items-baseline justify-between">
                            <h2 className="text-xl font-semibold tracking-tight">
                                Latest articles
                            </h2>
                            <Button variant="link" asChild className="px-0">
                                <Link href={posts()}>Browse all posts →</Link>
                            </Button>
                        </div>

                        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                            {rest.map((article) => (
                                <Card
                                    key={article.id}
                                    className="border-0 bg-transparent p-0 shadow-none"
                                >
                                    <CardHeader className="px-0 pt-0">
                                        <Badge
                                            variant="outline"
                                            className="mb-3 w-fit"
                                        >
                                            {article.tag}
                                        </Badge>
                                        <CardContent className="px-0">
                                                <Link
                                                    href={showPost({
                                                        post: article.id,
                                                    })}
                                                    className="group block"
                                                >
                                                <h3 className="text-lg leading-snug font-semibold tracking-tight group-hover:text-primary">
                                                    {article.title}
                                                </h3>
                                                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                                                    {article.excerpt}
                                                </p>
                                            </Link>
                                            <div className="mt-4">
                                                <ArticleMeta
                                                    article={article}
                                                />
                                            </div>
                                        </CardContent>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section id="topics" className="border-t pt-10">
                        <h2 className="mb-4 text-xl font-semibold tracking-tight">
                            Topics
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'Productivity',
                                'Engineering',
                                'Writing',
                                'Systems',
                            ].map((topic) => (
                                <Badge
                                    key={topic}
                                    variant="secondary"
                                    className="rounded-full px-3 py-1 text-sm"
                                >
                                    {topic}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    <Separator className="my-10" />

                    <section className="rounded-xl border bg-muted/40 p-8 text-center">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Start writing your own knowledge base
                        </h2>
                        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                            Create, edit, and publish posts from a clean
                            dashboard. Your words, organized and readable.
                        </p>
                        <div className="mt-6 flex justify-center gap-3">
                            <Button size="lg" asChild>
                                <Link href={posts()}>Open the editor</Link>
                            </Button>
                            {!auth.user && (
                                <Button size="lg" variant="outline" asChild>
                                    <Link href={register()}>
                                        Create account
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </section>
                </main>

                <footer className="border-t px-4 py-6 text-center text-sm text-muted-foreground sm:px-6">
                    Knowledge — a quiet place to read and write. Built with
                    Laravel, Inertia & React.
                </footer>
            </div>
        </>
    );
}
