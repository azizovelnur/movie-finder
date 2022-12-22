type Twatchlist = {
  id: number
  title: string
  poster_path: string
}

export const getDataFromLocalStorage = () => {
  const moviesData = localStorage.getItem('watchlistItemLC')
  const moviesLS = moviesData ? JSON.parse(moviesData) : []
  return moviesLS as Twatchlist[]
}