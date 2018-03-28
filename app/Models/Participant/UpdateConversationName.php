<?php declare(strict_types=1);

namespace App\Models\Participant;

use App\Models\Participant;
use App\Models\Conversation\Name;

/**
 * Class UpdateConversationName
 * @package App\Models\Participant
 */
class UpdateConversationName
{
    /**
     * @param \App\Models\Participant $participant
     * @throws \App\Models\Conversation\UndilutedParticipant
     */
    public function created(Participant $participant): void
    {
        /**
         * @var \App\Models\Conversation $conversation
         */
        $conversation = $participant->conversation;

        Name::addParticipantName($conversation, $participant);
    }

    /**
     * @param \App\Models\Participant $participant
     * @return void
     */
    public function deleted(Participant $participant): void
    {
        /**
         * @var \App\Models\Conversation $conversation
         */
        $conversation = $participant->conversation;

        Name::removeParticipantName($conversation, $participant);
    }
}