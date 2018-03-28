<?php declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Fideloper\Proxy\TrustProxies as Middleware;

/**
 * Class TrustProxies
 * @package App\Http\Middleware
 */
class TrustProxies extends Middleware
{
    /**
     * @var array
     */
    protected $proxies;

    /**
     * @var string
     */
    protected $headers = Request::HEADER_X_FORWARDED_ALL;
}
