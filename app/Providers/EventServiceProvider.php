<?php declare(strict_types=1);

namespace App\Providers;

use App\Models\Participant;
use App\Event\MessageCreated;
use App\Listeners\BroadcastMessageCreated;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

/**
 * Class EventServiceProvider
 * @package App\Providers
 */
class EventServiceProvider extends ServiceProvider
{
    /**
     * @var array
     */
    protected $listen = [
//        MessageCreated::class => [
//            BroadcastMessageCreated::class,
//        ],
    ];

    /**
     * @return void
     */
    public function boot(): void
    {
        parent::boot();

        Participant::observe(Participant\UpdateConversationName::class);
    }
}
