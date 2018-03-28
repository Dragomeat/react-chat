<?php declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Conversation;
use App\Models\Participant\ConversationInviteRule;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class CreateConversationRequest
 * @package App\Http\Requests
 */
class CreateConversationRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return Gate::allows('create', Conversation::class);
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|max:255',
          // 'participants' => 'required|array|each|exists:users,id',
        ];
    }
}
