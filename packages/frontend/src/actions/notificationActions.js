export const NOTIFY_ERROR = 'NOTIFY_ERROR';
export const NOTIFY_SUCCESS = 'NOTIFY_SUCCESS';
export const NOTIFY_CLEAR = 'NOTIFY_CLEAR';

export const notifyError = error => ({
  type: NOTIFY_ERROR,
  payload: error,
});

export const notifySuccess = message => ({
  type: NOTIFY_SUCCESS,
  payload: message,
});

export const notifyClear = () => ({ type: NOTIFY_CLEAR });
