import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchMovies = createAsyncThunk(
  'movie/fetchMovie',
  async (query) => {
    const data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=dfd3c55a40f798c4ac314d4aeaf609ea&query=${query}`)
    return data.data.results
  })


const initialState = {
  movies: [],
  searchValue: '',
  status: ''
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,

  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload
    }
  },

  extraReducers: (builder) => {

    builder.addCase(fetchMovies.pending, (state) => {
      state.status = 'loading'
      console.log(state.status)
    })

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.movies = action.payload
    })

    builder.addCase(fetchMovies.rejected, (state) => {
      state.status = 'error'
    })

  }
})

export const {setSearchValue} = movieSlice.actions

export default movieSlice.reducer