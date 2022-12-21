import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTopRatedMovies = createAsyncThunk(
  'movie/fetchTopRatedMovies',
  async () => {
    const API_URL = 'https://api.themoviedb.org/3'
    const data = await axios.get(`${API_URL}/movie/top_rated`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }
    })
    return data.data.results
  })


const initialState = {
  topRatedMoviesData: [],
  status: ''
}

const topRatedMoviesSlice = createSlice({
  name: 'topRatedMovies',
  initialState,

  extraReducers: (builder) => {

    builder.addCase(fetchTopRatedMovies.pending, (state) => {
      state.status = 'loading'
    })

    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.topRatedMoviesData = action.payload
    })

    builder.addCase(fetchTopRatedMovies.rejected, (state) => {
      state.status = 'error'
    })

  }
})


export default topRatedMoviesSlice.reducer