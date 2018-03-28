<?php declare(strict_types=1);

namespace App\Policies;

use App\Models\User;
use App\Models\Conversation;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class ConversationPolicy
 * @package App\Policies
 */
class ConversationPolicy
{
    use HandlesAuthorization;

    /**
     * @param \App\Models\User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * @param \App\Models\User $user
     * @param \App\Models\Conversation $conversation
     * @return bool
     */
    public function update(User $user, Conversation $conversation): bool
    {
        return $conversation->isAdmin($user);
    }

    /**
     * @param \App\Models\User $user
     * @param \App\Models\Conversation $conversation
     * @return bool
     */
    public function destroy(User $user, Conversation $conversation): bool
    {
        return $conversation->isAdmin($user);
    }
}
