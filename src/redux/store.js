import { configureStore } from '@reduxjs/toolkit'
import movie from './movieSlice/movieSlice'
import watchList from './watchlistSlice/watchlistSlice'
import popularMovie from './popularMoviesSlice/popularMoviesSlice'

export const store = configureStore({
  reducer: {
    movie,
    watchList,
    popularMovie
  },
})