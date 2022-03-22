

import selectRegions from "./select-regions";


const selectSelectedRegions = (state) => {
  let result = [];
  const regions = selectRegions(state);
  for (let key in regions) {
    if (regions[key].selected)  {
      result.push(key);
    }
  }
  return result;
}

export default selectSelectedRegions;


