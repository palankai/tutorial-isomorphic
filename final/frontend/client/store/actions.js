const REQUEST_EXCERPTS = 'REQUEST_EXCERPTS';
const RECEIVE_EXCERPTS = 'RECEIVE_EXCERPTS';
const RECEIVE_EXCERPTS_FAILED = 'RECEIVE_EXCERPTS_FAILED';


export function requestExcerpts() {
  return (dispatch, { backend }) => {
    return backend.getItems().then(
      response => dispatch(receiveExcerpts(response.items)),
      error => dispatch(receiveExcerptsFailed('Error'))
    );
  };
}

export function receiveExcerpts(items) {
  return {
    type: RECEIVE_EXCERPTS,
    items
  };
}

export function receiveExcerptsFailed(error) {
  return {
    type: RECEIVE_EXCERPTS_FAILED,
    error
  };
}
