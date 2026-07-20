import { Head, Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard, login, register } from '@/routes';
import { index as posts } from '@/routes/posts';
import type { Auth } from '@/types';

export default function Welcome() {
    const { auth } = usePage<{ auth: Auth }>().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <header className="flex items-center justify-between border-b px-6 py-4">
                    <AppLogo />

                    <nav className="flex items-center gap-2">
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
                                    <Link href={register()}>Register</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </header>

                <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-16">
                    <section className="space-y-4 text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Build something great with Laravel
                        </h1>
                        <p className="mx-auto max-w-2xl text-balance text-muted-foreground">
                            This starter kit pairs Laravel, Inertia, and React
                            with a clean component system so you can focus on
                            your product instead of boilerplate.
                        </p>
                        <div className="flex justify-center gap-3">
                            <Button size="lg" asChild>
                                <Link href={posts()}>Browse posts</Link>
                            </Button>
                            {!auth.user && (
                                <Button size="lg" variant="outline" asChild>
                                    <Link href={register()}>Get started</Link>
                                </Button>
                            )}
                        </div>
                    </section>

                    <section className="grid gap-6 sm:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Documentation</CardTitle>
                                <CardDescription>
                                    Learn the framework fundamentals.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="link" asChild className="px-0">
                                    <a
                                        href="https://laravel.com/docs"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Read the docs
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Laracasts</CardTitle>
                                <CardDescription>
                                    Level up with video tutorials.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="link" asChild className="px-0">
                                    <a
                                        href="https://laracasts.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Watch now
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Deploy</CardTitle>
                                <CardDescription>
                                    Ship with Laravel Cloud.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="link" asChild className="px-0">
                                    <a
                                        href="https://cloud.laravel.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Deploy now
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </section>
                </main>

                <footer className="border-t px-6 py-4 text-center text-sm text-muted-foreground">
                    Laravel Starter Kit — built with Inertia & React.
                </footer>
            </div>
        </>
    );
}
