export type TpopularMovies = {
  id: number
  title: string
  poster_path: string
}

export interface AxiosIpopularMovies {
  results: TpopularMovies[],
}
export interface IpopularMovies {
  popularMovies: TpopularMovies[],
  popularMoviesStatus: Status
}

export enum Status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}