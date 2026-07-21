import { Form, Head, Link } from '@inertiajs/react';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';

type User = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
};

export default function AdminUsersEdit({ user }: { user: User }) {
    return (
        <>
            <Head title="Admin - Edit User" />

            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <Heading
                    title={`Edit User: ${user.name}`}
                    description="Update user details"
                />

                <div className="mt-6 max-w-lg">
                    <Form {...UserController.update.form({ user: user.id })}>
                        {({ errors, processing }) => (
                            <div className="space-y-6">

                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        defaultValue={user.name}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        defaultValue={user.email}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">
                                        Password
                                        <span className="text-muted-foreground text-xs font-normal">
                                            {' '}
                                            (leave blank to keep current)
                                        </span>
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-destructive">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="is_admin"
                                        name="is_admin"
                                        defaultChecked={user.is_admin}
                                    />
                                    <Label htmlFor="is_admin">
                                        Admin privileges
                                    </Label>
                                    {errors.is_admin && (
                                        <p className="text-sm text-destructive">
                                            {errors.is_admin}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving...'
                                            : 'Save Changes'}
                                    </Button>
                                    <Link
                                        href={UserController.index().url}
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin' },
    { title: 'Users', href: '/admin/users' },
    { title: 'Edit', href: '/admin/users/{id}/edit' },
];

AdminUsersEdit.layout = {
    breadcrumbs,
};
