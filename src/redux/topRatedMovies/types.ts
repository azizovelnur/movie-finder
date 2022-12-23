export type TtopRatedMovies = {
  id: number
  title: string
  poster_path: string
}

export interface AxiosItopRatedMovies {
  results: TtopRatedMovies[],
}
export interface ItopRatedMovies {
  topRatedMoviesData: TtopRatedMovies[],
  status: Status
}

export enum Status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}