import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {TpopularMovies, IpopularMovies, AxiosIpopularMovies, Status} from './types'


export const fetchPopularMovies = createAsyncThunk<TpopularMovies[]>(
  'movie/fetchPopularMovies',
  async () => {
    const API_URL:string = 'https://api.themoviedb.org/3'
    const { data } = await axios.get<AxiosIpopularMovies>(`${API_URL}/movie/popular`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }
    })
    return data.results
  })


const initialState: IpopularMovies = {
  popularMovies: [],
  popularMoviesStatus: Status.LOADING
}

const popularMovieSlice = createSlice({
  name: 'popularMovies',
  initialState,


   reducers: {

  },

  extraReducers: (builder) => {

    builder.addCase(fetchPopularMovies.pending, (state) => {
      state.popularMoviesStatus = Status.LOADING
    })

    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMoviesStatus = Status.LOADED
      state.popularMovies = action.payload
    })

    builder.addCase(fetchPopularMovies.rejected, (state) => {
      state.popularMoviesStatus = Status.ERROR
    })
  }
})
export default popularMovieSlice.reducer