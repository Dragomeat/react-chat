export function isCurrentStatus(status, state, statusFieldName = 'status') {
    return state[statusFieldName] === status;
}