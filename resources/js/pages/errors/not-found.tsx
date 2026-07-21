import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';
import { index as postsIndex } from '@/routes/posts';

type Props = {
    status?: number;
    message?: string;
};

const DEFAULTS: Record<number, { title: string; message: string }> = {
    403: {
        title: 'Access denied',
        message: 'You do not have permission to view this resource.',
    },
    404: {
        title: 'Not found',
        message: 'The page or resource you are looking for could not be found.',
    },
    419: {
        title: 'Session expired',
        message: 'Your session has expired. Please refresh and try again.',
    },
    429: {
        title: 'Too many requests',
        message: 'Please slow down and try again in a moment.',
    },
    500: {
        title: "Something went wrong",
        message: 'An unexpected error occurred. Please try again shortly.',
    },
    503: {
        title: 'Service unavailable',
        message: 'The service is temporarily unavailable. Please check back soon.',
    },
};

export default function NotFound({ status = 404, message }: Props) {
    const details = DEFAULTS[status] ?? DEFAULTS[404];
    const title = message && status === 404 ? 'Not found' : details.title;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
            <Head title={`${status} · ${title}`} />

            <p className="font-serif text-6xl leading-none font-bold tracking-tight text-muted-foreground/40">
                {status}
            </p>
            <h1 className="mt-6 font-serif text-2xl font-bold tracking-tight">
                {title}
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
                {message ?? details.message}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild>
                    <Link href={home()}>Back to home</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href={postsIndex()}>My posts</Link>
                </Button>
            </div>
        </div>
    );
}

NotFound.layout = null;
