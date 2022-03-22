import {changeShop} from "../api/api";
import getShopsThunk from "./get-shops-thunk";

const changeShopThunk = (token, id, data, success, error,errorNotFound,loading,) => async dispatch => {
  loading(true);
  const response = await changeShop(token, id, data);
  if (response.data.message) {
    if(response.data.message==="Not Found"){
      errorNotFound(response.data.message);
    }
    else{
      error(response.data.message)
    }
  } else {
    success();
  }
  loading(false);
  dispatch(getShopsThunk(token));
}

export default changeShopThunk;
