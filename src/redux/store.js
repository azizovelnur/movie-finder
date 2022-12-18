import { configureStore } from '@reduxjs/toolkit'
import searchMovies from './searchMoviesSlice'
import watchList from './watchlistSlice'
import popularMovie from './popularMoviesSlice'
import topRatedMovies from "./topRatedMoviesSlice";

export const store = configureStore({
  reducer: {
    searchMovies,
    watchList,
    popularMovie,
    topRatedMovies
  },
})