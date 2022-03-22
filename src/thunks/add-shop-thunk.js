import {addShop} from "../api/api";
import getShopsThunk from "./get-shops-thunk";




const addShopThunk = (token, data, cbErr,loading) => async dispatch => {
  loading(true);
  const response = await addShop(token, data);
  if (response.data.id) {
    dispatch(getShopsThunk(token));
    cbErr(-1);
    
  } else {
    cbErr(response.data.message);
  }
  loading(false);

}

export default addShopThunk;
