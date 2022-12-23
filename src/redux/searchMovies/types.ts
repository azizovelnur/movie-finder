export type TSearchMovies = {
  id: number
  title: string
  poster_path: string
}

export interface AxiosISearchMovies {
  results: TSearchMovies[],
}
export interface ISearchMovies {
  searchMoviesData: TSearchMovies[],
  searchValue: string
  status: string | any
}


// export enum Status {
//   LOADING = 'loading',
//   LOADED = 'loaded',
//   ERROR = 'error',
// }
