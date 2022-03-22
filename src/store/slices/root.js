import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  token: null,
  login: null,
  password: null,
  shops: [],
  regions:[],
  nextListOffset: 0,
  fontSize:15
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setShops: (state, action) => {
      state.shops = {};
      for (let item of action.payload) {
        state.shops[item.id] = {
          ...item,
          selected: false,
        };
      }
    },
    setShopPIP:(state,action)=>{
      state.shops[action.payload.shopId].pages_in_process=action.payload.PIP;
    },
    setRegions:(state,action)=>{
      state.regions={};
      for(let item of action.payload){
        state.regions[item.id]={
          ...item,
          selected:false,
        }
      }
    },
    setRegionsSelection: (state, action) => {
      for (let key of Object.keys(state.regions)) {
        state.regions[key].selected = action.payload;
      }
    },

    setRegionSelection: (state, action) => {
      state.regions[action.payload.id].selected = action.payload.value;
    },
    
    setShopSelection: (state, action) => {
      state.shops[action.payload.id].selected = action.payload.value;
    },
    setShopsSelection: (state, action) => {
      for (let key of Object.keys(state.shops)) {
        state.shops[key].selected = action.payload;
      }
    },
    setCurrentShop: (state, action) => {
      state.currentShop = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setNextListOffset: (state, action) => {
      state.nextListOffset = action.payload;
    },
    handleIncrementFont:(state)=>{
      state.fontSize+=1;
    },
    handleDecrementFont:(state)=>{
      state.fontSize-=1;
    }
    

  },
  
})

export default rootSlice.reducer;
export const {setToken, setShops, setShopSelection, setShopsSelection, setCurrentShop, setLogin, setPassword, setNextListOffset,setRegionsSelection,setRegionSelection,setRegions,handleIncrementFont,handleDecrementFont,setShopPIP} = rootSlice.actions;