import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import sliderStyle from './MovieSlider.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {A11y, Navigation, Pagination} from "swiper";

const MovieSlider = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={1}
        slidesPerView={1}
        navigation
        pagination={{clickable: true}}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <div className={sliderStyle.slider}>
            <img src="https://e1nur.github.io/UlyibkaReady/images/promotionImg/kt.jpg" alt=""/>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={sliderStyle.slider}></div>
        </SwiperSlide>

        <SwiperSlide>
            <div className={sliderStyle.slider}></div>
        </SwiperSlide>


      </Swiper>
    </>
  );
};

export default MovieSlider;