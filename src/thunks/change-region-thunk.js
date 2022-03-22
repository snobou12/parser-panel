import {changeRegion} from "../api/api";
import getRegionsThunk from "./get-regions-thunk";

const changeRegionThunk = (token, regionId,shopId, data, success, error,errorNotFound,loading) => async dispatch => {
  loading(true);
  const response = await changeRegion(token,regionId,data);

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
  dispatch(getRegionsThunk(token,shopId));
}

export default changeRegionThunk;
