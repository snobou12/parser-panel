import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  message: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    }
  }
})

export default loginSlice.reducer;
export const {setMessage} = loginSlice.actions;
