import { Head, Link } from '@inertiajs/react';
import { Bookmark, MessageSquare, ThumbsUp, User, FileText } from 'lucide-react';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

type Stats = {
    totalUsers: number;
    totalPosts: number;
    totalComments: number;
    totalLikes: number;
};

export default function AdminDashboard({ stats }: { stats: Stats }) {
    const cards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: User,
            href: '/admin/users',
            color: 'text-blue-600',
        },
        {
            title: 'Total Posts',
            value: stats.totalPosts,
            icon: FileText,
            href: '/admin/posts',
            color: 'text-emerald-600',
        },
        {
            title: 'Total Comments',
            value: stats.totalComments,
            icon: MessageSquare,
            color: 'text-violet-600',
        },
        {
            title: 'Total Likes',
            value: stats.totalLikes,
            icon: ThumbsUp,
            color: 'text-rose-600',
        },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <Heading title="Dashboard" description="Overview of the platform" />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <Card key={card.title}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {card.title}
                                    </CardTitle>
                                    <Icon className={`size-5 ${card.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{card.value}</div>
                                    {card.href && (
                                        <Link
                                            href={card.href}
                                            className="mt-1 inline-block text-xs text-muted-foreground hover:text-foreground"
                                        >
                                            View all →
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Dashboard', href: '/admin' },
];

AdminDashboard.layout = {
    breadcrumbs,
};
