import {addRegion} from "../api/api";




const addRegionThunk = (token,shopId, data,cbErr,loading) => async dispatch => {
  loading(true);
  const response = await addRegion(token, shopId, data);
  if (response.data.id) {
    cbErr(-1);
  } else {
    cbErr(response.data.message);
  }
  loading(false);
}

export default addRegionThunk;
