import { configureStore } from '@reduxjs/toolkit'
import movie from './movieSlice/movieSlice'
import watchList from './watchlistSlice/watchlistSlice'

export const store = configureStore({
  reducer: {
    movie,
    watchList
  },
})