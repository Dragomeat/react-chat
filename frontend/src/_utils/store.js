import {rootReducer} from '_reducers';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {echoMiddleware} from '_middlewares';

export function configureStore(middlewares) {
    const loggerMiddleware = createLogger();

    return createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
            echoMiddleware,
            ...middlewares,
        ),
    );
}