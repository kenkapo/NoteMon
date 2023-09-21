import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { createUser,checkUser,updateUser } from '../API/authAPI.js'; 
const initialState = {
  loggedInUser:null,
  status:"idle",
  signupmessage:"",
  loginmessage:""
};

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (signinInfo) => {
      const response = await createUser(signinInfo);
      return response.data;
    }
  );

  export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (userInfo) => {
      const response = await checkUser(userInfo);
      return response.data;
    }
  );

  export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (userInfo) => {
      const response = await updateUser(userInfo);
      return response.data;
    }
  );

const mySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser(state)
    {
      state.loggedInUser=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        state.loggedInUser=action.payload;
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.status = 'idle';
        state.signupmessage="User already exists";
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        state.loggedInUser=action.payload[0];
      })
      .addCase(checkUserAsync.rejected, (state) => {
        state.status = 'idle';
        state.loginmessage="Invalid Email or Password";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        state.loggedInUser=action.payload;
      })
    }
});

export const {  resetUser } = mySlice.actions;

export const stateloggedInUser=(state)=>state.auth.loggedInUser;
export const stateLoginMessage=(state)=>state.auth.loginmessage;
export const stateSignUpMessage=(state)=>state.auth.signupmessage;
export default mySlice.reducer;
