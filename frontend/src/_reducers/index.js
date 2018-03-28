import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {userReducer} from './UserReducer';
import {routerReducer} from 'react-router-redux';
import {conversationReducer} from './ConversationReducer';
import {messageReducer} from './MessageReducer';

export const rootReducer =  combineReducers({
    user: userReducer,
    conversations: conversationReducer,
    messages: messageReducer,
    router: routerReducer,
    form: formReducer,
});