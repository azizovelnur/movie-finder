import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import WatchListItem from "../../components/WatchListItem/WatchListItem";
import wlStyle from '../../components/WatchListItem/WatchListItem.module.scss'

const WatchList = () => {


  const {watchlist} = useSelector((state) => state.watchList)

  const watchListItem = watchlist.map((item) => <WatchListItem key={item.id} {...item}/>)


  // useEffect(() => {
  //   const jsonWatchListElements = JSON.stringify(watchlist);
  //   localStorage.setItem('watchlistItemLC', jsonWatchListElements)
  // }, [watchlist])

  return (
    <section className={wlStyle.watchList}>
      <div className={wlStyle.watchList__items}>

        {
          watchListItem
        }
      </div>
    </section>
  );
};

export default WatchList;