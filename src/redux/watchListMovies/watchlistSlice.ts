import {createSlice} from "@reduxjs/toolkit";
import {getDataFromLocalStorage} from "../../utils/getDataFromLocalStorage";
import {addToLocalStorage} from "../../utils/addToLocalStorage";

const initialState = {
  watchlist: getDataFromLocalStorage()
}

const watchlistSlice = createSlice({
  name: 'watclist',
  initialState,

  reducers: {
    addItem(state, action) {
      const movies = state.watchlist.filter((obj) => obj.id !== action.payload.id)
      state.watchlist = [...movies, action.payload]
      addToLocalStorage(state.watchlist)
    },
    removeItem(state, action) {
      state.watchlist = state.watchlist.filter((item) => item.id !== action.payload)
      addToLocalStorage(state.watchlist)
    },
  },
})

export const {addItem, removeItem} = watchlistSlice.actions

export default watchlistSlice.reducer