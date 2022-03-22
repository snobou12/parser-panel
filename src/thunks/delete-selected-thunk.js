import deleteShopThunk from "./delete-shop-thunk";

const deleteSelectedThunk = (token, ids) => dispatch => {
  for (let id of ids) {
    dispatch(deleteShopThunk(token, id))
  }
}

export default deleteSelectedThunk;