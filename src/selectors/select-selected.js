import selectShops from "./select-shops";

const selectSelected = (state) => {
  let result = [];
  const shops = selectShops(state);
  for (let key in shops) {
    if (shops[key].selected)  {
      result.push(key);
    }
  }
  return result;
}

export default selectSelected;