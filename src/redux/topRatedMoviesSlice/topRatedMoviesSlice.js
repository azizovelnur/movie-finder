import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTopRatedMovies = createAsyncThunk(
  'movie/fetchTopRatedMovies',
  async () => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=dfd3c55a40f798c4ac314d4aeaf609ea`)
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
      console.log(state.status)
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