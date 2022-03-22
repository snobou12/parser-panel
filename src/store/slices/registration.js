import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  message: null,
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    }
  }
})

export default registrationSlice.reducer;
export const {setStatus, setMessage} = registrationSlice.actions;