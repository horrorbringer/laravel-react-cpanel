import { Head, Link, router, usePage } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { show as showPost } from '@/actions/App/Http/Controllers/PostController';
import { Input } from '@/components/ui/input';
import { search as searchRoute } from '@/routes';

type Article = {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readingTime: string;
};

function ArticleCard({ article }: { article: Article }) {
    return (
        <Link
            href={showPost({ post: article.id })}
            className="group block border-b border-border/70 py-6 outline-none transition-colors last:border-0 focus-visible:ring-2 focus-visible:ring-ring/50"
        >
            <h2 className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                {article.title}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {article.excerpt}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                    {article.author}
                </span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readingTime}</span>
            </div>
        </Link>
    );
}

export default function Search() {
    const { articles, query } = usePage<{
        articles: Article[];
        query: string;
    }>().props;

    const [value, setValue] = useState(query);
    const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        debounce.current = setTimeout(() => {
            router.get(
                searchRoute().url,
                { q: value || undefined },
                { preserveState: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(debounce.current);
    }, [value]);

    return (
        <>
            <Head title={query ? `Search: ${query}` : 'Search'} />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
                <div className="relative">
                    <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2" />
                    <Input
                        ref={inputRef}
                        type="search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search articles..."
                        className="h-12 pl-10 text-base"
                    />
                </div>

                <div className="mt-8">
                    {value && (
                        <p className="mb-2 text-sm text-muted-foreground">
                            {articles.length} result{articles.length !== 1 ? 's' : ''} for{' '}
                            <span className="font-medium text-foreground">
                                &ldquo;{value}&rdquo;
                            </span>
                        </p>
                    )}

                    {articles.length === 0 ? (
                        <p className="py-16 text-center text-sm text-muted-foreground">
                            {value
                                ? 'No articles match your search.'
                                : 'Type above to search articles.'}
                        </p>
                    ) : (
                        <div>
                            {articles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
