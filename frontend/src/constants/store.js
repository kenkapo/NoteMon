import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import modeReducer from "../Slices/DarkModeSlice";
import noteReducer from "../Slices/NotesSlice"
export const store = configureStore({
    reducer: {
      auth:authReducer,
      darkmode:modeReducer,
      notes:noteReducer
    },
  })