<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Swagger\Annotations as SWG;

/**
 * Class Controller.
 *
 * @SWG\Info(
 *   title="ReactMessenger",
 *   version="0.0.1",
 *   @SWG\Contact(
 *     email="dragomeat@dragomeat.com",
 *     name="Dragomeat",
 *     url="http://dragomeat.com",
 *   ),
 *   @SWG\License(
 *     name="MIT",
 *     url="http://github.com/Dragomeat/react-messenger/blob/master/LICENSE",
 *   ),
 * )
 * @SWG\Swagger(
 *   host="localhost",
 *   basePath="/api/v1",
 *   schemes={"http"},
 *   produces={"application/json"},
 *   consumes={"application/json"},
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
