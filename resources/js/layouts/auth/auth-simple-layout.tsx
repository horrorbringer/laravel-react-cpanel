import { Head, Link, usePage } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { login, register, home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import type { Auth } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const { resolvedAppearance, updateAppearance } = useAppearance();

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Head title={title} />

            <header className="sticky top-0 z-10 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex min-w-0 items-center gap-5">
                        <Link href={home()} aria-label="Home">
                            <AppLogo />
                        </Link>
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
                        {!auth.user && (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="hidden sm:inline-flex"
                                >
                                    <Link href={login()}>Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={register()}>Get started</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
                <div className="mx-auto w-full max-w-sm">
                    <div className="space-y-2 text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-center text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    <div className="mt-8">{children}</div>
                </div>
            </main>
        </div>
    );
}
