import React, {useEffect} from 'react';
import {Skeleton, SkeletonSlider} from "../components/Skeleton";
import {useDispatch, useSelector} from "react-redux";
import {fetchSearchMovies} from "../redux/searchMoviesSlice";
import { Movie } from "../components/Movie";
import {fetchPopularMovies} from "../redux/popularMoviesSlice";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Autoplay} from "swiper";
import {fetchTopRatedMovies} from "../redux/topRatedMoviesSlice";
import { MovieSlider } from "../components/MovieSlider";

export const Home = () => {
  const dispatch = useDispatch()
  const {searchValue} = useSelector((state) => state.searchMovies)
  const {popularMovies, popularMoviesStatus} = useSelector((state) => state.popularMovie)
  const {topRatedMoviesData, status} = useSelector((state) => state.topRatedMovies)


  const skeletons = [...new Array(20)].map((_, index) => <Skeleton key={index}/>)

  const topRatedMovies = topRatedMoviesData.map((obj) => <Movie key={obj.id} {...obj}/>)

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
        >

          {
            (popularMoviesStatus === 'loading') ? <SkeletonSlider/> : pMovies
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
