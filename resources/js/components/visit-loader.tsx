import { router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const DELAY_MS = 250;

export function VisitLoader() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const start = () => {
            timer = setTimeout(() => setVisible(true), DELAY_MS);
        };

        const stop = () => {
            clearTimeout(timer);
            setVisible(false);
        };

        const unsubscribeStart = router.on('start', start);
        const unsubscribeFinish = router.on('finish', stop);

        return () => {
            clearTimeout(timer);
            unsubscribeStart();
            unsubscribeFinish();
        };
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div
            role="status"
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center"
        >
            <div className="mt-3 flex items-center gap-2 rounded-full border border-border/70 bg-background/90 px-3 py-1.5 text-sm text-muted-foreground shadow-lg backdrop-blur">
                <Loader2 className="size-4 animate-spin" />
                <span>Loading…</span>
            </div>
        </div>
    );
}
