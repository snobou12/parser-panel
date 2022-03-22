import {login} from "../api/api";
import {setLogin, setPassword, setToken} from "../store/slices/root";
import {setMessage} from "../store/slices/login";

const loginThunk = (data, navigate) => async (dispatch) => {
  const result = await login(data);
  if (result.data.token) {
    
    dispatch(setLogin(data.email))
    dispatch(setPassword(data.password))
    dispatch(setToken(result.data.token))
    dispatch(setMessage(''))
    navigate('/shops');
  } else {
    if (result.data.message === 'wrong email or password')
      dispatch(setMessage('Неправильная почта или пароль'))
  }
}

export default loginThunk;