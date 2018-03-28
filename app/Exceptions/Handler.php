<?php declare(strict_types=1);

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Class Handler
 * @package App\Exceptions
 */
class Handler extends ExceptionHandler
{
    /**
     * @var array
     */
    protected $dontReport = [
        JWTException::class,
    ];

    /**
     * @param  \Exception $exception
     * @return void
     * @throws \Exception
     */
    public function report(Exception $exception): void
    {
        if ($this->shouldReport($exception)) {
            app('sentry')->captureException($exception);
        }

        parent::report($exception);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \Illuminate\Auth\AuthenticationException $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function unauthenticated($request, AuthenticationException $exception): JsonResponse
    {
        return response()->json(
            $this->convertExceptionToArray($exception), 401
        );
    }

    /**
     * @param \Illuminate\Validation\ValidationException $exception
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function convertValidationExceptionToResponse(ValidationException $exception, $request): JsonResponse
    {
        if ($exception->response) {
            return $exception->response;
        }

        return response()->json(
            $this->convertExceptionToArray($exception), $exception->status
        );
    }

    /**
     * @param \Exception $exception
     * @return array
     */
    protected function convertExceptionToArray(Exception $exception): array
    {
        return array_merge([
            'success' => false,
            'message' => $exception->getMessage() ?: 'Internal Server Error',
            'data' => [],
        ], ['errors' => $exception instanceof ValidationException ? $exception->errors() : []]);
    }
}
