import { getFromServer } from 'client/api';


export const submitForm = (formData) => ({
  type: 'SUBMIT_FORM',
  formData
});

export const requestFromServer = () => ({
  type: 'REQUEST'
});

export const receiveFromServer = (items) => ({
  type: 'RESPONSE',
  createdAt: Date.now(),
  items: items
});

export const unmount = (items) => ({
  type: 'UNMOUNT',
  createdAt: Date.now()
});

export const fetchFromServer = () => {
  return dispatch => {
    dispatch(requestFromServer());
    return getFromServer().then(data => {
      dispatch(receiveFromServer(data.items));
    });
  };
};
