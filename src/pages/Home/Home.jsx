import React, {useEffect} from 'react';
import Skeleton from "../../components/Skeleton/Skeleton";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../redux/movieSlice/movieSlice";
import Movies from "../../components/Movies/Movies";
import MoviesStyle from '../../components/Movies/Movies.module.scss'

const Home = () => {
  const dispatch = useDispatch()
  const {searchValue, movies} = useSelector((state) => state.movie)
  const {watchlist} = useSelector((state) => state.watchList)

  const {status} = useSelector((state) => state.movie)

  const skeletons = [...new Array(20)].map((_, index) => <Skeleton key={index}/>)

  const findMovies = movies.map((obj) => <Movies key={obj.id} {...obj}/>)

  console.log(searchValue)
  console.log(movies)

  useEffect(() => {
    if (searchValue !== '') {
      dispatch(fetchMovies(searchValue))
    }
  }, [searchValue])


  useEffect(() => {
    const jsonWatchListElements = JSON.stringify(watchlist);
    localStorage.setItem('watchlistItemLC', jsonWatchListElements)
  }, [watchlist])


  return (
    <>
      <div>HOME</div>
      <section className={MoviesStyle.movies}>
        <div className={MoviesStyle.movies__items}>
          {
            status === 'loading' ? skeletons : findMovies
          }
        </div>
      </section>
    </>
  )
}

export default Home;