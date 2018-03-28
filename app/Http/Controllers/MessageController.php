<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Event\MessageCreated;
use App\Http\Requests\CreateMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Participant;
use Illuminate\Http\Request;
use App\Http\Resources\MessageCollection;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class MessageController
 * @package App\Http\Controllers
 */
class MessageController extends Controller
{
    /**
     * @param Conversation $conversation
     * @return JsonResource
     */
    public function index(Conversation $conversation): JsonResource
    {
        $messages = $conversation
            ->messages()
            ->latest()
            ->paginate(25);

        return new MessageCollection($messages);
    }

    /**
     * @param CreateMessageRequest $request
     * @param Conversation $conversation
     * @return JsonResource
     * @throws \Exception
     */
    public function store(CreateMessageRequest $request, Conversation $conversation): JsonResource
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();
        $participant = $conversation->getParticipantFor($user);

        if ($participant === null) {
            throw new \Exception('Participant not found.');
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'participant_id' => $participant->id,
            'user_id' => $user->id,
            'content' => $request->get('content'),
        ]);

        event(new MessageCreated($message));

        return new MessageResource($message);
    }

    /**
     * @param Conversation $conversation
     * @param Message $message
     * @return JsonResource
     */
    public function show(Conversation $conversation, Message $message): JsonResource
    {
        return new MessageResource($message);
    }

    /**
     * @param \App\Http\Requests\UpdateMessageRequest $request
     * @param \App\Models\Conversation $conversation
     * @param \App\Models\Message $message
     * @return \App\Http\Resources\MessageResource
     */
    public function update(UpdateMessageRequest $request, Conversation $conversation, Message $message): MessageResource
    {
        $message->update([
            'content' => $request->get('content'),
        ]);

        return new MessageResource($message);
    }

    /**
     * @param Conversation $conversation
     * @param Message $message
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function destroy(Conversation $conversation, Message $message)
    {
        $message->delete();

        return response([
            'success' => true,
        ]);
    }
}
