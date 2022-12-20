import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSearchMovies = createAsyncThunk(
  'searchMovies/fetchSearchMovies',
  async (query, ThunkApi) => {
    const searchData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=dfd3c55a40f798c4ac314d4aeaf609ea&query=${query}`)

    if (searchData.data.results.length === 0) {
      return ThunkApi.rejectWithValue('error')
    }
    return ThunkApi.fulfillWithValue(searchData.data.results)
  })


const initialState = {
  searchMoviesData: [],
  searchValue: '',
  status: ''
}

const searchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState,

  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload
    }
  },

  extraReducers: (builder) => {

    builder.addCase(fetchSearchMovies.pending, (state) => {
      state.status = 'loading'
    })

    builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.searchMoviesData = action.payload
    })

    builder.addCase(fetchSearchMovies.rejected, (state, action) => {
      state.status = action.payload
    })

  }
})

export const {setSearchValue} = searchMoviesSlice.actions

export default searchMoviesSlice.reducer