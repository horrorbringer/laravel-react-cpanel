import { router } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { like } from '@/routes/posts';

type Props = {
    postId: number;
    isLiked: boolean;
    count: number;
};

export function LikeButton({ postId, isLiked, count }: Props) {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.post(like({ post: postId }).url)}
            className={cn(
                'gap-1.5',
                isLiked && 'text-red-500 hover:text-red-600',
            )}
        >
            <Heart
                className={cn('h-4 w-4', isLiked && 'fill-current')}
            />
            {count}
        </Button>
    );
}
