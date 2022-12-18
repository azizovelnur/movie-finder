import React from 'react';
import {useSelector} from "react-redux";
import { Movie } from "../components/Movie";

export const WatchList = () => {


  const {watchlist} = useSelector((state) => state.watchList)

  const watchListItem = watchlist.map((item) => <Movie key={item.id} {...item}/>)


  return (
    <section>
      <div className={'flex flex-wrap'}>
        {
          watchListItem
        }
      </div>
    </section>
  )
}