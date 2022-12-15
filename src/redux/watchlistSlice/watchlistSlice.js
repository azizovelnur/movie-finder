import {createSlice} from "@reduxjs/toolkit";
import {getDataFromLocalStorage} from "../../utils/getDataFromLocalStorage";


const initialState = {
  watchlist: getDataFromLocalStorage()
}

const watchlistSlice = createSlice({
  name: 'watclist',
  initialState,

  reducers: {
    setSavedMovies: (state) => {
      state.watchlist = state.watchlist.filter((movie) => {
        if (movie.isSaved) {
          return movie
        }
      })
    },

    addItem(state, action) {
      const movie = state.watchlist.find((obj) => obj.id === action.payload.id);

      if (movie) {
        movie.isSaved = !movie.isSaved
      } else {
        state.watchlist.push({
          ...action.payload,
          isSaved: true
        })
      }
    },
  },


})

export const findMovieById = (id) => (state) => state.watchList.watchlist.find((obj) => obj.id === id)

export const {addItem,setSavedMovies} = watchlistSlice.actions


export default watchlistSlice.reducer