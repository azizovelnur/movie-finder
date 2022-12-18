import {createSlice} from "@reduxjs/toolkit";
import {getDataFromLocalStorage} from "../utils/getDataFromLocalStorage";


const initialState = {
  watchlist: getDataFromLocalStorage()
}

const watchlistSlice = createSlice({
  name: 'watclist',
  initialState,

  reducers: {
    addItem(state, action) {
      const movies = state.watchlist.filter((obj) => obj.id !== action.payload.id);
      state.watchlist = [...movies, action.payload]

      const jsonWatchListElements = JSON.stringify(state.watchlist);
      localStorage.setItem('watchlistItemLC', jsonWatchListElements)
    },
    removeItem(state, action) {
      state.watchlist = state.watchlist.filter((item) => item.id !== action.payload)

      const jsonWatchListElements = JSON.stringify(state.watchlist);
      localStorage.setItem('watchlistItemLC', jsonWatchListElements)
    },

  },


})


export const {addItem, removeItem} = watchlistSlice.actions


export default watchlistSlice.reducer