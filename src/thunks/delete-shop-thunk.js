import {deleteShop} from "../api/api";
import getShopsThunk from "./get-shops-thunk";

const deleteShopThunk = (token, id) => async dispatch => {
  const response = await deleteShop(token, id);
  
    dispatch(getShopsThunk(token));
 
  
}

export default deleteShopThunk;