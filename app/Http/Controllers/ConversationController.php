<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateConversationRequest;
use App\Http\Requests\UpdateConversationRequest;
use App\Http\Resources\ConversationCollection;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\ConversationWithRelationsResource;
use App\Models\Conversation;
use App\Models\Participant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class ConversationController.
 */
class ConversationController extends Controller
{
    /**
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index(): JsonResource
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $conversations = Conversation::forUser($user)
            ->with(['latestMessage'])
            ->withCount(['messages as new_messages_count' => function (Builder $query) use ($user) {
                $query->whereHas('participant', function (Builder $query) use ($user) {
                    $query->where('user_id', $user->id)
                        ->where(function (Builder $query) {
                            $query->whereDate('messages.created_at', '>', 'last_read_at')
                                ->orWhereNull('last_read_at');
                        });
                });
            }])
            ->latest('conversations.updated_at')
            ->paginate();

        return new ConversationCollection($conversations);
    }

    /**
     * @param \App\Models\Conversation $conversation
     *
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show(Conversation $conversation): JsonResource
    {
        return new ConversationWithRelationsResource($conversation);
    }

    /**
     * @param \App\Http\Requests\CreateConversationRequest $request
     *
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(CreateConversationRequest $request): JsonResource
    {
        $conversation = Conversation::create($request->only('name'));

        $conversation->participants()->create([
            'user_id' => auth()->user()->getAuthIdentifier(),
            'role'    => Participant\RoleType::ADMIN,
        ]);

        foreach ($request->get('participants', []) as $participant) {
            /* @var  Participant $participant */
            $conversation->participants()->create([
                'user_id' => $participant,
            ]);
        }

        return new ConversationResource($conversation);
    }

    /**
     * @param UpdateConversationRequest $request
     * @param Conversation              $conversation
     *
     * @return JsonResource
     */
    public function update(UpdateConversationRequest $request, Conversation $conversation): JsonResource
    {
        $conversation->update([
            'name' => $request->get('name'),
        ]);

        return new ConversationWithRelationsResource($conversation);
    }

    /**
     * @param \App\Models\Conversation $conversation
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Conversation $conversation): JsonResponse
    {
        //
    }
}
