
import deleteRegionThunk from "./delete-region-thunk";

const deleteSelectedRegionsThunk = (token, ids,shopId) => dispatch => {
  for (let id of ids) {
    dispatch(deleteRegionThunk(token, id,shopId))
  }
}

export default deleteSelectedRegionsThunk;



