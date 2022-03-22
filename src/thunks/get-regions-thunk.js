import {getRegions} from "../api/api";
import { setRegions} from "../store/slices/root";

const getRegionsThunk = (token, shopId) => async (dispatch, getState) => {
  const response = await getRegions(token,shopId);
  if (Array.isArray(response.data)) { 
      
      let result = [];
    
      result.push(...response.data);
      dispatch(setRegions(result));
    
  }
}

export default getRegionsThunk;