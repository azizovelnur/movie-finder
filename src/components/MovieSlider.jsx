import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Link} from "react-router-dom";

export const MovieSlider = ({obj}) => {
  return (
    <Link to={`movie/${obj.id}`}>
      <div className={'text-white w-full h-[470px]'}>
        <div className={'absolute top-[10px] left-[10px] text-[30px]'}>{obj.title}</div>
        <img className={'w-full'} src={`https://image.tmdb.org/t/p/w1280/${obj.backdrop_path}`} alt=""/>
      </div>
    </Link>
  )
}