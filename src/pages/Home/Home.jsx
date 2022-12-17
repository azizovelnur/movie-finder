import React, {useEffect} from 'react';
import { Skeleton } from "../../components/Skeleton/Skeleton";
import {useDispatch, useSelector} from "react-redux";
import {fetchSearchMovies} from "../../redux/searchMoviesSlice/searchMoviesSlice";
import Movies from "../../components/Movies/Movies";
import MoviesStyle from '../../components/Movies/Movies.module.scss'
// import sliderStyle from '../../components/MoviesSlider/MovieSlider.module.scss'
import {fetchPopularMovies} from "../../redux/popularMoviesSlice/popularMoviesSlice";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Autoplay} from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import {fetchTopRatedMovies} from "../../redux/topRatedMoviesSlice/topRatedMoviesSlice";
import MovieSlider from "../../components/MoviesSlider/MovieSlider";

const Home = () => {
  const dispatch = useDispatch()
  const {searchValue} = useSelector((state) => state.searchMovies)
  const {popularMovies} = useSelector((state) => state.popularMovie)
  const {topRatedMoviesData, status} = useSelector((state) => state.topRatedMovies)


  const skeletons = [...new Array(20)].map((_, index) => <Skeleton key={index}/>)

  const topRatedMovies = topRatedMoviesData.map((obj) => <Movies key={obj.id} {...obj}/>)

  const pMovies = popularMovies.map((obj) =>
    <SwiperSlide key={obj.id}>
      <MovieSlider obj={obj}/>
    </SwiperSlide>
  )


  useEffect(() => {
    if (searchValue !== '') {
      dispatch(fetchSearchMovies(searchValue))
    }
  }, [searchValue])

  useEffect(() => {
    dispatch(fetchPopularMovies())
  }, [])

  useEffect(() => {
    dispatch(fetchTopRatedMovies())
  }, [])


  return (
    <>
      <section className={'mb-[100px]'}>
        <div className={'text-[30px] mb-[10px] text-center'}>Popular Movies</div>
        <Swiper
          className={'rounded-[20px] relative'}
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

      <section>
        <div className={'text-[36px] text-center'}>Top Rated</div>
        <div className={'flex flex-wrap'}>
          {
            status === 'loading' ? skeletons : topRatedMovies
          }
        </div>
      </section>
    </>
  )
}

export default Home;