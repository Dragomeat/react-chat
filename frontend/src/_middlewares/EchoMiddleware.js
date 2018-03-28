import Echo from 'laravel-echo';
import {EchoConstants} from '../_constants';
import * as io from 'socket.io-client';


const echo = new Echo({
    auth: {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    },
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
    client: io,
});

export const echoMiddleware = store => next => action => {
    switch (action.type) {
        case EchoConstants.ADD_CHANNEL_LISTENER:
            echo.private(action.payload.channel)
                .listen(action.payload.action, action.payload.callback);
    }

    return next(action);
};