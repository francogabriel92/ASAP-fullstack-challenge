import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  file: null,
  loading: false,
  error: null
};



const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
})

export const { setFiles, setFile, setLoading, setError } = filesSlice.actions;

export default filesSlice.reducer;