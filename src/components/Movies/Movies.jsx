import React from 'react';
import MoviesStyle from './Movies.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem} from "../../redux/watchlistSlice/watchlistSlice";
import {ReactComponent as AddToWl} from '../../assets/favorite-add-icon.svg'
import {ReactComponent as RemoveFromWl} from '../../assets/favorite-remove-icon.svg'
import {Link} from "react-router-dom";

const Movies = ({id, poster_path, title, vote_average}) => {


  const {watchlist} = useSelector(state => state.watchList)

  const dispatch = useDispatch()


  const addItemToWatchList = () => {
    dispatch(addItem({poster_path, title, vote_average, id}))
  }

  const removeWatchListItem = () => {
    dispatch(removeItem(id))
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
        watchlist.find((obj) => obj.id === id) ?
          <button onClick={removeWatchListItem} className={MoviesStyle.item__watchListBtn}>
            <span>remove</span>
            <RemoveFromWl className={MoviesStyle.btnIcon} height={20} width={20}/>
          </button>
          :

          <button onClick={addItemToWatchList}
                  className={MoviesStyle.item__watchListBtn}>
            <span>add to watchlist</span>
            <AddToWl  className={MoviesStyle.btnIcon} height={20} width={20}/>
          </button>
      }

    </div>

  );
};

export default Movies;