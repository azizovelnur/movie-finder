import React from 'react';
import MoviesStyle from './Movies.module.scss'
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {addItem, removeItem} from "../../redux/watchlistSlice/watchlistSlice";
import {Link, useLocation} from "react-router-dom";

const Movies = ({id, poster_path, title, vote_average}) => {

  const locationPath = useLocation();
  const dispatch = useDispatch()

  const watchlistRef = useRef()

  const addItemToWatchList = () => {
    // watchlistRef.current.disabled = true
    // watchlistRef.current.innerText = 'was added'
    dispatch(addItem({poster_path, title, vote_average, id}))
  }

   const removeWatchListItem = () => {
   dispatch(removeItem(id))
 }


  const titleUrl = title.replace(/\s/g, '-')


  return (

    <div className={MoviesStyle.item}>
      <Link to={`/movie/${id}${titleUrl}`}>

      <img
        className={MoviesStyle.item__img}
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt=""
      />

      </Link>
      <div className={MoviesStyle.item__title}>{title}</div>

      <div className={MoviesStyle.item__rating}>{vote_average}</div>

      {
        (locationPath.pathname === '/') ?  <button ref={watchlistRef} disabled={false} onClick={addItemToWatchList} className={MoviesStyle.item__watchListBtn}>add to watchlist</button>  : <button onClick={removeWatchListItem} className={MoviesStyle.item__watchListBtn}>remove</button>
      }

    </div>

  );
};

export default Movies;