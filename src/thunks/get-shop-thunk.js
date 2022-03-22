import {getShop} from "../api/api";
import { setShopPIP } from "../store/slices/root";

const getShopThunk = (token, id) => async dispatch => {
  const response = await getShop(token, id);
  if(response.data.pages_in_process){
    dispatch(setShopPIP({PIP:response.data.pages_in_process,shopId:response.data.id}));
  }
  
}

export default getShopThunk;