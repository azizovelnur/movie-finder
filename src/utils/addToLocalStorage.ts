export const addToLocalStorage = function (value: Object) {
  localStorage.setItem('watchlistItemLC', JSON.stringify(value))
}