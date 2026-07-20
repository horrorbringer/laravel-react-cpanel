<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        $this->seedSamplePosts($user);

        return $user;
    }

    /**
     * Create a few starter posts so the new user has content to explore.
     */
    private function seedSamplePosts(User $user): void
    {
        $samples = [
            [
                'title' => 'Welcome to your knowledge base',
                'content' => '<p>This is your first post. Edit or delete it, then start writing your own.</p>',
                'published' => true,
            ],
            [
                'title' => 'Writing tips for clearer posts',
                'content' => '<p>Short sentences. One idea per paragraph. Lead with the point.</p>',
                'published' => true,
            ],
            [
                'title' => 'My draft idea',
                'content' => '<p>A work in progress — publish it when it is ready.</p>',
                'published' => false,
            ],
        ];

        foreach ($samples as $sample) {
            Post::create([
                'title' => $sample['title'],
                'content' => $sample['content'],
                'published' => $sample['published'],
            ]);
        }
    }
}
