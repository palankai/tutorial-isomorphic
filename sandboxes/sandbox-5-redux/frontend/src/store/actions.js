export const submitForm = formData => ({
  type: 'SUBMIT_FORM',
  formData
});

export const requestFromServer = () => ({
  type: 'REQUEST'
});

export const receiveFromServer = items => ({
  type: 'RESPONSE',
  createdAt: Date.now(),
  items
});

export const unmount = () => ({
  type: 'UNMOUNT',
  createdAt: Date.now()
});

export const fetchFromServer = api => (dispatch) => {
  dispatch(requestFromServer());
  return api.getItems().then((data) => {
    dispatch(receiveFromServer(data.items));
  });
};
