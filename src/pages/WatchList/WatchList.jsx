import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import wlStyle from '../../components/Movies/Movies.module.scss'
import Movies from "../../components/Movies/Movies";

const WatchList = () => {


  const {watchlist} = useSelector((state) => state.watchList)

  const watchListItem = watchlist.map((item) => <Movies key={item.id} {...item}/>)


  // useEffect(() => {
  //   const jsonWatchListElements = JSON.stringify(watchlist);
  //   localStorage.setItem('watchlistItemLC', jsonWatchListElements)
  // }, [watchlist])

  return (
    <section className={wlStyle.movies}>
      <div className={wlStyle.movies__items}>
        {
          watchListItem
        }
      </div>
    </section>
  );
};

export default WatchList;