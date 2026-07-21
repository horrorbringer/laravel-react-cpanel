import { Form, Head, Link } from '@inertiajs/react';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';

export default function AdminUsersCreate() {
    return (
        <>
            <Head title="Admin - Create User" />

            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <Heading title="Create User" description="Add a new user to the platform" />

                <div className="mt-6 max-w-lg">
                    <Form {...UserController.store.form()}>
                        {({ errors, processing }) => (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" type="text" required />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-destructive">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox id="is_admin" name="is_admin" />
                                    <Label htmlFor="is_admin">Admin privileges</Label>
                                    {errors.is_admin && (
                                        <p className="text-sm text-destructive">
                                            {errors.is_admin}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create User'}
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
    { title: 'Create', href: '/admin/users/create' },
];

AdminUsersCreate.layout = {
    breadcrumbs,
};
