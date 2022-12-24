import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosItopRatedMovies, TtopRatedMovies, ItopRatedMovies, Status} from "./types";
import {API_URL} from "../../utils/variables";


export const fetchTopRatedMovies = createAsyncThunk<TtopRatedMovies[]>(
  'movie/fetchTopRatedMovies',
  async () => {
    const { data } = await axios.get<AxiosItopRatedMovies>(`${API_URL}/movie/top_rated`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY
      }
    })
    return data.results
  })


const initialState: ItopRatedMovies = {
  topRatedMoviesData: [],
  status: Status.LOADING
}

const topRatedMoviesSlice = createSlice({
  name: 'topRatedMovies',
  initialState,


  reducers: {

  },

  extraReducers: (builder) => {

    builder.addCase(fetchTopRatedMovies.pending, (state) => {
      state.status = Status.LOADING
    })

    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.status = Status.LOADED
      state.topRatedMoviesData = action.payload
    })

    builder.addCase(fetchTopRatedMovies.rejected, (state) => {
      state.status = Status.ERROR
    })

  }
})


export default topRatedMoviesSlice.reducer