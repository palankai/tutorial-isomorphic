export const EXCERPTS = {
  LOADING: 'EXCERPT.LOADING',
  RECEIVE: 'EXCERPT.RECEIVE',
  FAILED: 'EXCERPT.FAILED',
  UNLOAD: 'EXCERPT.UNLOAD'
};


export function requestExcerpts() {
  return (dispatch, getState, { backend }) => {
    dispatch({
      type: EXCERPTS.LOADING
    });
    return backend.getItems().then(
      response => dispatch({type: EXCERPTS.RECEIVE, items: response.items}),
      error => dispatch({type: EXCERPTS.FAILED, error: 'error'})
    );
  };
}

export function unloadExcerpts() {
  return {
    type: EXCERPTS.UNLOAD
  };
}
