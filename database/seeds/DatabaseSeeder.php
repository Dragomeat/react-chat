<?php

declare(strict_types=1);

use App\Models\Conversation;
use App\Models\Conversation\ConversationType;
use App\Models\Message;
use App\Models\Participant;
use App\Models\Participant\RoleType;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Class DatabaseSeeder.
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection
         * @var \Illuminate\Database\Eloquent\Collection $users
         */
        $users = factory(User::class, 100)->create([
            'is_confirmed' => true,
        ]);

        $users->add(User::create([
            'name'         => 'Dragomeat',
            'email'        => 'dragomeat@dragomeat.com',
            'password'     => bcrypt('secret'),
            'is_confirmed' => true,
        ]));

        $conversations = factory(Conversation::class, 250)->create([
            'type' => ConversationType::PRIVATE_DUAL,
        ]);

        for ($i = 0; $i < 1000; $i++) {
            /**
             * @var \App\Models\User
             * @var \App\Models\Conversation $conversation
             */
            $conversation = $conversations->random();

            do {
                $user = $users->random();
            } while ($conversation->participants()
                ->where('user_id', $user->id)
                ->first() !== null);

            $participant = Participant::create([
                'user_id'         => $user->id,
                'conversation_id' => $conversation->id,
                'role'            => $conversation->participants()
                    ->where('role', RoleType::ADMIN)
                    ->count() > 0 ? RoleType::MEMBER : RoleType::ADMIN,
            ]);

            $conversation->participants()->save($participant);

            factory(Message::class, random_int(10, 500))->create([
                'conversation_id' => $conversation->id,
                'participant_id'  => $participant->id,
            ]);
        }
    }
}
