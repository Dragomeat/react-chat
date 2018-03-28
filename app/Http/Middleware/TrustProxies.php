<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Fideloper\Proxy\TrustProxies as Middleware;
use Illuminate\Http\Request;

/**
 * Class TrustProxies.
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
