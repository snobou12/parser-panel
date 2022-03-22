import {login} from "../api/api";
import {setToken} from "../store/slices/root";

const getTokenThunk = (data, navigate) => async dispatch => {
  const response = await login(data);
  if (response.data.token) {
    dispatch(setToken(response.data.token));
  } else if (response.data.message) {
    navigate('/login');
  }
}

export default getTokenThunk;