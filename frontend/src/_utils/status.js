import {BaseStatusConstants} from '_constants';

export function isCurrentStatus(status, state, statusFieldName = 'status') {
    return state[statusFieldName] === status;
}

export function isInitializedStatus(state, statusFieldName = 'status') {
    return isCurrentStatus(BaseStatusConstants.INITIALIZED, state, statusFieldName);
}

export function isFetchingStatus(state, statusFieldName = 'status') {
    return isCurrentStatus(BaseStatusConstants.FETCHING, state, statusFieldName);
}

export function isFetchedStatus(state, statusFieldName = 'status') {
    return isCurrentStatus(BaseStatusConstants.FETCHED, state, statusFieldName);
}

export function isFailedStatus(state, statusFieldName = 'status') {
    return isCurrentStatus(BaseStatusConstants.FAILED, state, statusFieldName);
}