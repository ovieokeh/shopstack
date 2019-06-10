export const SET_LIMIT = 'SET_LIMIT';
export const RESET_LIMIT = 'RESET_LIMIT';

export const setLimit = limit => ({ type: SET_LIMIT, payload: limit });
export const resetLimit = () => ({ type: RESET_LIMIT });
