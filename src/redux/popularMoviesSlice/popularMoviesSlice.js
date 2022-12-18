import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPopularMovies = createAsyncThunk(
  'movie/fetchPopularMovies',
  async () => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=dfd3c55a40f798c4ac314d4aeaf609ea`)
    return data.data.results
  })


const initialState = {
  popularMovies: [],
  popularMoviesStatus: ''
}

const popularMovieSlice = createSlice({
  name: 'popularMovies',
  initialState,

  extraReducers: (builder) => {

    builder.addCase(fetchPopularMovies.pending, (state) => {
      state.popularMoviesStatus = 'loading'
    })

    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMoviesStatus = 'loaded'
      state.popularMovies = action.payload
    })

    builder.addCase(fetchPopularMovies.rejected, (state) => {
      state.popularMoviesStatus = 'error'
    })

  }
})


export default popularMovieSlice.reducer