import React from 'react';
import sliderStyle from './MovieSlider.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {Link} from "react-router-dom";

const MovieSlider = ({obj}) => {
  return (
    <Link to={`movie/${obj.id}`}>
      <div className={sliderStyle.slider__item}>
        <div className={sliderStyle.title}>{obj.title}</div>
        <img className={sliderStyle.image} src={`https://image.tmdb.org/t/p/w1280/${obj.backdrop_path}`} alt=""/>
      </div>
    </Link>

  );
};

export default MovieSlider;