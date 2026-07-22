import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowUpRight, Moon, PenLine, Search, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import {
    create as createPost,
    index as postsIndex,
} from '@/actions/App/Http/Controllers/PostController';
import { show as showPost } from '@/actions/App/Http/Controllers/PostController';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAppearance } from '@/hooks/use-appearance';
import { home, login, register, search as searchRoute } from '@/routes';
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

    const [headerVisible, setHeaderVisible] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const lastScroll = useRef(0);

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(searchRoute().url, {
            q: searchQuery.trim() || undefined,
        });
    };

    useEffect(() => {
        const onScroll = () => {
            const currentScroll = window.scrollY;
            const diff = currentScroll - lastScroll.current;

            if (currentScroll <= 0) {
                setHeaderVisible(true);
            } else if (diff > 10) {
                setHeaderVisible(false);
            } else if (diff < -10) {
                setHeaderVisible(true);
            }

            lastScroll.current = currentScroll;
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const featured: Article | undefined = articles[0];
    const rest: Article[] = articles.slice(1);

    return (
        <>
            <Head title="Knowledge" />

            <div className="relative flex min-h-screen flex-col overflow-hidden bg-background pb-16 text-foreground lg:pb-0">
                <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_top,oklch(0.92_0.04_250_/_0.55),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,oklch(0.28_0.04_250_/_0.38),transparent_65%)]" />
                <header
                    className={`sticky top-0 z-10 border-b border-border/70 bg-background/80 backdrop-blur transition-transform duration-300 supports-[backdrop-filter]:bg-background/60 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}
                >
                    <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
                        <Link
                            href={home()}
                            className="flex shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <AppLogo />
                            <span className="hidden font-serif text-lg font-bold tracking-tight sm:inline">
                                Knowledge
                            </span>
                        </Link>
                        <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground lg:flex">
                            <Link
                                href={home()}
                                className="transition-colors hover:text-foreground"
                            >
                                Home
                            </Link>
                            <a
                                href="#latest"
                                className="transition-colors hover:text-foreground"
                            >
                                Latest stories
                            </a>
                        </nav>
                        <form
                            className="hidden min-w-0 flex-1 lg:block lg:max-w-md"
                            onSubmit={submitSearch}
                        >
                            <div className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="Search published articles..."
                                    aria-label="Search published articles"
                                    className="h-10 rounded-full border-transparent bg-muted/70 pl-10 text-sm shadow-none transition-colors hover:bg-muted focus-visible:border-input focus-visible:bg-background"
                                />
                            </div>
                        </form>
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
                                    <Button
                                        asChild
                                        className="hidden sm:inline-flex"
                                    >
                                        <Link href={register()}>
                                            Get started
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
                    {featured ? (
                        <section className="grid items-end gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
                            <div className="max-w-sm">
                                <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
                                    Fresh reads
                                </p>
                                <h1 className="mt-4 font-serif text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
                                    Ideas worth keeping.
                                </h1>
                                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    A quiet collection of thoughtful writing
                                    from people who care about sharing what they
                                    know.
                                </p>
                                <a
                                    href="#latest"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                                >
                                    Explore the latest
                                    <ArrowUpRight className="size-4" />
                                </a>
                            </div>
                            <Link
                                href={showPost({ post: featured.id })}
                                className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-ring/50 sm:p-10"
                            >
                                <div className="mb-8 flex items-center justify-between text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                                    <span>Featured story</span>
                                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                                <h2 className="font-serif text-3xl leading-[1.12] font-bold tracking-tight transition-colors group-hover:text-primary sm:text-4xl">
                                    {featured.title}
                                </h2>
                                <p className="mt-5 line-clamp-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    {featured.excerpt}
                                </p>
                                <div className="mt-8 border-t border-border/70 pt-5">
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
                        <section id="latest" className="mt-20 scroll-mt-24">
                            <div className="mb-5 flex items-end justify-between gap-4 border-b border-border/70 pb-5">
                                <div>
                                    <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
                                        Keep reading
                                    </p>
                                    <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight">
                                        Latest stories
                                    </h2>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {rest.length} new
                                </span>
                            </div>
                            <div className="divide-y divide-border/70">
                                {rest.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={showPost({ post: article.id })}
                                        className="group grid gap-4 py-7 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                                    >
                                        <div>
                                            <h3 className="font-serif text-xl leading-snug font-bold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                                                {article.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4 sm:justify-end">
                                            <ArticleMeta article={article} />
                                            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <Separator className="my-16" />

                    <section className="rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm sm:p-12">
                        <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
                            Share what you know
                        </p>
                        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight">
                            Start writing your own knowledge base
                        </h2>
                        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                            Create, edit, and publish posts from a clean editor.
                            Your words, organized and readable.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <Button size="lg" asChild>
                                <Link href={postsIndex()}>
                                    Browse all posts
                                </Link>
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

                <footer className="border-t border-border/70 px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
                    Knowledge — a quiet place to read and write. Built with
                    Laravel, Inertia & React.
                </footer>
            </div>
        </>
    );
}
