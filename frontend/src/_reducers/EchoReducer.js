const initialState = {
    listeners: [],
    isConnected: false,
    isConnecting: false,
};

export function echo(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}