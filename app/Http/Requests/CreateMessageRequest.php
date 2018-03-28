<?php declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Message;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class CreateMessageRequest
 * @package App\Http\Requests
 */
class CreateMessageRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return Gate::allows('create', Message::class);
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'content' => ['required', 'max:255'],
        ];
    }
}
