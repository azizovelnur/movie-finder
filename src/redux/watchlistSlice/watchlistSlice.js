import {createSlice} from "@reduxjs/toolkit";



const initialState = {
  watchlist: JSON.parse(localStorage.getItem('watchlistItemLC')) || [],
}

const watchlistSlice = createSlice({
  name: 'watclist',
  initialState,

  reducers: {
    addItem(state, action) {
      state.watchlist.push(action.payload)
    },
    removeItem(state, action) {
      state.watchlist = state.watchlist.filter((item) => item.id !== action.payload)
    }
  },


})

export const {addItem, removeItem} = watchlistSlice.actions

export default watchlistSlice.reducer