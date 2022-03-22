import {getShops} from "../api/api";
import {setNextListOffset, setShops} from "../store/slices/root";

const getShopsThunk = (token, offset = 0, limit = 20) => async (dispatch, getState) => {
  const response = await getShops(token, offset, limit);
  if (Array.isArray(response.data)) {
    if (response.data.length === 20) {
      dispatch(setNextListOffset(offset + 20))
    } else {
      dispatch(setNextListOffset(null))
    }
    if (offset > 0) {
      const state = getState();
      let result = [];
      for (let key of Object.keys(state.root.shops)) {
        result.push(state.root.shops[key])
      }
      result.push(...response.data);
      dispatch(setShops(result));
    } else {
      dispatch(setShops(response.data));
    }
  }
}

export default getShopsThunk;