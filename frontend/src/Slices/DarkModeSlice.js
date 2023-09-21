import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode:false
};

const mySlice = createSlice({
  name: 'darkmode',
  initialState,
  reducers: {
    changeMode(state)
    {
        state.mode=!state.mode;
    }
  },
});

export const { changeMode} = mySlice.actions;
export const stateMode=(state)=>state.darkmode.mode;
export default mySlice.reducer;
