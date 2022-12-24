import React, {FC} from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Link} from "react-router-dom";

type TMovieSlider = {
  id: number
  title: string
  backdrop_path: string
}

export const MovieSlider: FC<TMovieSlider> = (obj) => {
  return (
    <Link to={`movie/${obj.id}`}>
      <div className={'sm:h-[470px] text-white w-full h-[260px]'}>
        <div className={'md:text-[30px] absolute top-[10px] left-[10px] text-[14px]'}>{obj.title}</div>
        <img className={'w-full h-full object-cover object-top'} src={`https://image.tmdb.org/t/p/w1280/${obj.backdrop_path}`} alt=""/>
      </div>
    </Link>
  )
}