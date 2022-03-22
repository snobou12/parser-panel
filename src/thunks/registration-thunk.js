import {register} from "../api/api";
import {setMessage} from "../store/slices/registration";
import loginThunk from "./login-thunk";

const registrationThunk = (data, navigate) => async (dispatch) => {
  const result = await register(data);
  if (result.data.email) {
    dispatch(loginThunk(data, navigate));
  } else {
    if (result.data.message === 'email already in use')
      dispatch(setMessage('Почта занята'))
  }
}

export default registrationThunk;
