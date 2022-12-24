import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosISearchMovies, ISearchMovies, Status, TSearchMovies} from './types'
import {API_URL} from "../../utils/variables";


export const fetchSearchMovies = createAsyncThunk<TSearchMovies[], string, {rejectValue: string}>(
  'searchMovies/fetchSearchMovies',
  async (query, {rejectWithValue}) => {
    const {data} = await axios.get<AxiosISearchMovies>(`${API_URL}/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${query}`)
    console.log(data)
    console.log(data.results)

    if (data.results.length === 0) {
      return rejectWithValue(Status.ERROR)
    }
    return data.results
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
      state.status = Status.LOADING
    })

    builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
      state.status = Status.LOADED
      state.searchMoviesData = action.payload
    })

    builder.addCase(fetchSearchMovies.rejected, (state, action) => {
      state.status = action.payload
    })

  }
})

export const {setSearchValue} = searchMoviesSlice.actions

export default searchMoviesSlice.reducer