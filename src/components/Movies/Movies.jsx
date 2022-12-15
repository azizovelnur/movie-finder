import React from 'react';
import MoviesStyle from './Movies.module.scss'
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem, findMovieById, setSavedMovies} from "../../redux/watchlistSlice/watchlistSlice";
import {ReactComponent as AddToWl} from '../../assets/favorite-add-icon.svg'
import {ReactComponent as RemoveFromWl} from '../../assets/favorite-remove-icon.svg'
import {Link} from "react-router-dom";

const Movies = ({id, poster_path, title, vote_average}) => {


  const savedMovie = useSelector(findMovieById(id))

  const dispatch = useDispatch()

  const watchlistRef = useRef()

  const addItemToWatchList = () => {
    dispatch(addItem({poster_path, title, vote_average, id}))
    dispatch(setSavedMovies())
  }


  // const titleUrl = title.replace(/\s/g, '-')


  return (

    <div className={MoviesStyle.item}>
      <Link to={`/movie/${id}`}>

        <img
          className={MoviesStyle.item__img}
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt=""
        />

      </Link>
      <div className={MoviesStyle.item__title}>{title}</div>

      <div className={MoviesStyle.item__rating}>{vote_average}</div>

      {
        <button ref={watchlistRef} disabled={false} onClick={addItemToWatchList}
                className={MoviesStyle.item__watchListBtn}>
          {
            savedMovie?.isSaved ? <span>remove</span> : <span>add</span>
          }
        </button>
      }

    </div>

  );
};

export default Movies;