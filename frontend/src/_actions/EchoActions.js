import {EchoConstants} from '_constants';

export function listen(channel, action, callback) {
    return {
        type: EchoConstants.ADD_CHANNEL_LISTENER,
        payload: {
            channel,
            action,
            callback
        },
    };
}