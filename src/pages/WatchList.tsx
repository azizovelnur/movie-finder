import React from 'react';
import {useSelector} from "react-redux";
import { Movie } from "../components/Movie";
import {RootState} from "../redux/store";

export const WatchList = () => {


  const {watchlist} = useSelector((state: RootState) => state.watchList)
  console.log(watchlist)

  const watchListItem = watchlist.map((item) => <Movie key={item.id} {...item}/>)


  return (
    <section>
      <div className={'md:flex md:flex-wrap xl:justify-start flex flex-wrap justify-around'}>
        {
          watchlist.length === 0 ? <div className={'text-4xl'}>Empty</div> : watchListItem
        }
      </div>
    </section>
  )
}