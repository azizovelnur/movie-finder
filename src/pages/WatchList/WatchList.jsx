import React from 'react';
import {useSelector} from "react-redux";
import wlStyle from '../../components/Movies/Movies.module.scss'
import Movies from "../../components/Movies/Movies";

const WatchList = () => {


  const {watchlist} = useSelector((state) => state.watchList)

  const watchListItem = watchlist.map((item) => <Movies key={item.id} {...item}/>)


  return (
    <section>
      <div className={'flex flex-wrap'}>
        {
          watchListItem
        }
      </div>
    </section>
  );
};

export default WatchList;