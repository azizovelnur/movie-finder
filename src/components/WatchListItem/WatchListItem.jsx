import React from 'react';
import wlStlye from './WatchListItem.module.scss'
import {useDispatch} from "react-redux";
import {removeItem} from "../../redux/watchlistSlice/watchlistSlice";

const WatchListItem = ({title, poster_path, vote_average, id}) => {

  const dispatch = useDispatch()


 const removeWatchListItem = () => {
   dispatch(removeItem(id))
 }

  return (
    <>
      <div className={wlStlye.item}>
        <img
          className={wlStlye.item__img}
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt=""
        />
        <div className={wlStlye.item__title}>{title}</div>

        <div className={wlStlye.item__rating}>{vote_average}</div>

        <button onClick={removeWatchListItem} className={wlStlye.item__watchListBtn}>remove</button>
      </div>
    </>
  )
}

export default WatchListItem