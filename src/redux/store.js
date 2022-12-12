import { configureStore } from '@reduxjs/toolkit'
import searchMovies from './searchMoviesSlice/searchMoviesSlice'
import watchList from './watchlistSlice/watchlistSlice'
import popularMovie from './popularMoviesSlice/popularMoviesSlice'

export const store = configureStore({
  reducer: {
    searchMovies,
    watchList,
    popularMovie
  },
})