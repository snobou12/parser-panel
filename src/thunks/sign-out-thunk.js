import {setLogin, setPassword, setToken} from "../store/slices/root";

const signOutThunk = () => dispatch => {
  dispatch(setPassword(null))
  dispatch(setLogin(null))
  dispatch(setToken(null))
  localStorage.removeItem('parser-panel-state')
}

export default signOutThunk;