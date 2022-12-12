import React, {useEffect} from 'react';
import Skeleton from "../../components/Skeleton/Skeleton";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../redux/movieSlice/movieSlice";
import Movies from "../../components/Movies/Movies";
import MoviesStyle from '../../components/Movies/Movies.module.scss'
import sliderStyle from '../../components/MoviesSlider/MovieSlider.module.scss'
import {fetchPopularMovies} from "../../redux/popularMoviesSlice/popularMoviesSlice";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Autoplay} from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'

const Home = () => {
  const dispatch = useDispatch()
  const {searchValue, movies} = useSelector((state) => state.movie)
  const {watchlist} = useSelector((state) => state.watchList)
  const {popularMovies} = useSelector((state) => state.popularMovie)

  const {status} = useSelector((state) => state.movie)

  const skeletons = [...new Array(20)].map((_, index) => <Skeleton key={index}/>)

  const findMovies = movies.map((obj) => <Movies key={obj.id} {...obj}/>)

  const pMovies = popularMovies.map((obj) =>
    <SwiperSlide key={obj.id}>
      <div className={sliderStyle.slider__item}>
        <div className={sliderStyle.title}>{obj.title}</div>
        <div className={sliderStyle.rating}> rating: {obj.vote_average}</div>
        <img className={sliderStyle.image} src={`https://image.tmdb.org/t/p/w1280/${obj.backdrop_path}`} alt=""/>
      </div>
    </SwiperSlide>
  )

  console.log(searchValue)
  console.log(movies)

  useEffect(() => {
    if (searchValue !== '') {
      dispatch(fetchMovies(searchValue))
    }
  }, [searchValue])

  useEffect(() => {
    dispatch(fetchPopularMovies())
  }, [])


  useEffect(() => {
    const jsonWatchListElements = JSON.stringify(watchlist);
    localStorage.setItem('watchlistItemLC', jsonWatchListElements)
  }, [watchlist])


  return (
    <>
      <section>
        <Swiper
          className={sliderStyle.slider}
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={1}
          slidesPerView={1}
          navigation
          loop={true}
          autoplay={true}
          pagination={{clickable: true}}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >

          {
            pMovies
          }


        </Swiper>
      </section>

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