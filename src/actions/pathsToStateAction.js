export const pathsToState = (action) => {
    return (dispatch) => {
        dispatch({ type: 'PATHS', paths: action})
      } 
}