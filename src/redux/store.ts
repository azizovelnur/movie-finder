import { configureStore } from '@reduxjs/toolkit'
import searchMovies from './searchMovies/searchMoviesSlice'
import watchList from './watchListMovies/watchlistSlice'
import popularMovie from './popularMovies/popularMoviesSlice'
import topRatedMovies from "./topRatedMovies/topRatedMoviesSlice"
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    searchMovies,
    watchList,
    popularMovie,
    topRatedMovies
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
