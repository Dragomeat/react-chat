<?php

declare(strict_types=1);

use App\Notifications\TestNotification;
use Illuminate\Http\Request;

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', 'Auth\LoginController@login')->name('auth.login');
    Route::post('/refresh', 'Auth\LoginController@refresh')->name('auth.refresh');
    Route::post('/logout', 'Auth\LoginController@logout')->name('auth.logout');
    Route::post('/register', 'Auth\RegisterController@register')->name('auth.register');

    Route::post('/confirm/{token}', function (string $token) {
        return response()->json([
            'success' => true,
            'token'   => $token,
        ]);
    })->name('auth.register.confirm');
});

Route::group(['middleware' => 'jwt'], function () {
    Route::apiResource('conversations', 'ConversationController');
    Route::apiResource('conversations/{conversation}/messages', 'MessageController');
    Route::get('user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data'    => $request->user(),
        ]);
    });

    Route::get('test', function () {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $user->notify(new TestNotification());

        return response()->json([
            'success' => true,
        ]);
    });
});
