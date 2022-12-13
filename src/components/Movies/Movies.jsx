import React from 'react';
import MoviesStyle from './Movies.module.scss'
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {addItem} from "../../redux/watchlistSlice/watchlistSlice";
import {Link} from "react-router-dom";

const Movies = ({id, poster_path, title, vote_average}) => {

  const dispatch = useDispatch()

  const watchlistRef = useRef()

  const addItemToWatchList = () => {
    // watchlistRef.current.disabled = true
    // watchlistRef.current.innerText = 'was added'
    dispatch(addItem({poster_path, title, vote_average, id}))
  }

  const titleUrl = title.replace(/\s/g, '-')


  return (

    <div className={MoviesStyle.item}>
      <Link to={`movie/${id}${titleUrl}`}>

      <img
        className={MoviesStyle.item__img}
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt=""
      />

      </Link>
      <div className={MoviesStyle.item__title}>{title}</div>

      <div className={MoviesStyle.item__rating}>{vote_average}</div>

      <button ref={watchlistRef} disabled={false} onClick={addItemToWatchList} className={MoviesStyle.item__watchListBtn}>add to watchlist</button>
    </div>

  );
};

export default Movies;