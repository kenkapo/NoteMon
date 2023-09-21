import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNote, getAllNotes, updateNote, deleteNote,getAllStarredNotes, searchNotes, sendNotes } from '../API/notesAPI';

const initialState = {
  notes: [],
  status: "idle"
};


export const createNoteAsync = createAsyncThunk(
  "note/createNote",
  async (note) => {
    const response = await createNote(note);
    return response.data;
  }
)

export const getAllNotesAsync = createAsyncThunk(
  "note/getAllNotes",
  async (id) => {
    const response = await getAllNotes(id);
    return response.data;
  }
)

export const updateNoteAsync = createAsyncThunk(
  "note/updateNote",
  async (note) => {
    const response = await updateNote(note);
    return response.data;
  }
)

export const deleteNoteAsync = createAsyncThunk(
  "note/deleteNote",
  async (id) => {
    const response = await deleteNote(id);
    return response.data;
  }
)

export const getAllStarredNotesAsync = createAsyncThunk(
  "note/getAllStarredNotes",
  async (id) => {
    const response = await getAllStarredNotes(id);
    return response.data;
  }
)

export const searchNotesAsync = createAsyncThunk(
  "note/searchNotes",
  async (obj) => {
    const response = await searchNotes(obj);
    return response.data;
  }
)

export const sendNotesAsync = createAsyncThunk(
  "note/sendNotes",
  async (obj) => {
    const response = await sendNotes(obj);
    return response.data;
  }
)

const mySlice = createSlice({
  name: 'note',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createNoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNoteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes.push(action.payload);
      })
      .addCase(getAllNotesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllNotesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes = action.payload;
      })
      .addCase(updateNoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.notes.findIndex((note) => note._id === action.payload._id);
        state.notes[index] = action.payload;
      })
      .addCase(deleteNoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.notes.findIndex((note) => note._id === action.payload._id);
        state.notes.splice(index,1);
      })
      .addCase(getAllStarredNotesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllStarredNotesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes=action.payload;
      })
      .addCase(searchNotesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchNotesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes=action.payload;
      })
      .addCase(sendNotesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendNotesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
  }
});

export const { } = mySlice.actions;
export const stateNotes = (state) => state.notes.notes;
export default mySlice.reducer;
