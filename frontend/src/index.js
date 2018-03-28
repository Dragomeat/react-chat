import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {routerMiddleware, ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {configureStore} from '_utils';
import {authTokenUpdate} from '_actions';
import {App} from './App';


const history = createHistory();
const store = configureStore([
    routerMiddleware(history),
]);


const token = localStorage.getItem('token');
if (token) {    
    store.dispatch(authTokenUpdate(token));
}

store.subscribe(() => {
    const { token } = store.getState().user;
    const oldToken = localStorage.getItem('token');

    if (!token || oldToken === token) {
        return;
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;   
    
    localStorage.setItem('token', token);    
});

axios.interceptors.request.use((config) => {
    const { token } = store.getState().user;

    if (token !== null)  {
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
});

axios.interceptors.response.use((response) => { //Autorefresh
    const token = response.headers['authorization'] ? response.headers['authorization'].substr(7) : null;

    if (token) { 
        store.dispatch(authTokenUpdate(token));
    }

    return response;
});


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
