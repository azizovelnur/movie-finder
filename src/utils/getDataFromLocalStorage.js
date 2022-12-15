export const getDataFromLocalStorage = () => {
  const moviesData = localStorage.getItem('watchlistItemLC')
  const moviesLS = moviesData ? JSON.parse(moviesData) : []
  return moviesLS
}