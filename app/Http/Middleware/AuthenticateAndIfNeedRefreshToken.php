<?php declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

/**
 * Class AuthenticateAndIfNeedRefreshToken
 * @package App\Http\Middleware
 */
class AuthenticateAndIfNeedRefreshToken extends BaseMiddleware
{
    /**
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return \Illuminate\Http\JsonResponse
     * @throws \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException
     * @throws \Symfony\Component\HttpKernel\Exception\BadRequestHttpException
     */
    public function handle(Request $request, Closure $next)
    {
        $this->checkForToken($request);

        return $this->authenticateAndMaybeRefresh($request, $next);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param null|string $token
     * @return \Illuminate\Http\JsonResponse
     * @throws \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException
     */
    public function authenticateAndMaybeRefresh(Request $request,  Closure $next, ?string $token = null)
    {
        try {
            $token ? $this->auth->setToken($token) : $this->auth->parseToken();

            if (!$this->auth->authenticate()) {
                throw new JWTException('User not found.');
            }
        } catch (TokenExpiredException $e) {
            $refreshed = $this->auth->refresh();

            return $this->authenticateAndMaybeRefresh($request, $next, $refreshed);
        } catch (JWTException $e) {
            throw new UnauthorizedHttpException('jwt-auth', $e->getMessage(), $e, $e->getCode());
        }

        $response = $next($request);

        return $token === null
            ? $response
            : $this->setAuthenticationHeader($response, $token);
    }

}