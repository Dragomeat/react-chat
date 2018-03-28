<?php declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdateMessageRequest
 * @package App\Http\Requests
 */
class UpdateMessageRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return Gate::allows('update', $this->route('message'));
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
