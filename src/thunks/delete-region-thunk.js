import {deleteRegion} from "../api/api";
import getRegionsThunk from "./get-regions-thunk";


const deleteRegionThunk = (token, regionId,shopId) => async dispatch => {
  const response = await deleteRegion(token, regionId);
  dispatch(getRegionsThunk(token,shopId));

}

export default deleteRegionThunk;