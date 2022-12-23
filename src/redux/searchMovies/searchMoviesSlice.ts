import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosISearchMovies, ISearchMovies, TSearchMovies} from './types'



// type Tquery = Record<string, string>
export const fetchSearchMovies = createAsyncThunk<TSearchMovies[], void>(
  'searchMovies/fetchSearchMovies',
  async (query, ThunkApi) => {
    const API_URL:string = 'https://api.themoviedb.org/3'
    const {data} = await axios.get<AxiosISearchMovies>(`${API_URL}/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${query}`)


    if (data.results.length === 0) {
      return ThunkApi.rejectWithValue('error')
    }
    return ThunkApi.fulfillWithValue(data.results)
  })


const initialState: ISearchMovies = {
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