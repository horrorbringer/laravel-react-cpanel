import { router } from '@inertiajs/react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { bookmark } from '@/routes/posts';

type Props = {
    postId: number;
    isBookmarked: boolean;
};

export function BookmarkButton({ postId, isBookmarked }: Props) {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.post(bookmark({ post: postId }).url)}
            className={cn(
                'gap-1.5',
                isBookmarked && 'text-amber-500 hover:text-amber-600',
            )}
        >
            <Bookmark
                className={cn('h-4 w-4', isBookmarked && 'fill-current')}
            />
        </Button>
    );
}
