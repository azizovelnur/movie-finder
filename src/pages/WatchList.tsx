import React, {FC} from 'react';
import {useSelector} from "react-redux";
import { Movie } from "../components/Movie";
import {RootState} from "../redux/store";

const WatchList: FC = () => {

  const {watchlist} = useSelector((state: RootState) => state.watchList)
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

//export default react lazy
export default WatchList