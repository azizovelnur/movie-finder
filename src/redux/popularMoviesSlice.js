import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPopularMovies = createAsyncThunk(
  'movie/fetchPopularMovies',
  async () => {
    const API_URL = 'https://api.themoviedb.org/3'
    const data = await axios.get(`${API_URL}/movie/popular`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }
    })
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