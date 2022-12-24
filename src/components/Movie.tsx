import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItem, removeItem} from "../redux/watchlistSlice";
import {ReactComponent as AddToWl} from '../assets/icons/favorite-add-icon.svg'
import {ReactComponent as RemoveFromWl} from '../assets/icons/favorite-remove-icon.svg'
import {Link} from "react-router-dom";
import {RootState} from "../redux/store";


type TMovie = {
    id: number,
    title: string,
    poster_path: string
  }

export const Movie: FC<TMovie> = ({id, poster_path, title}) => {


  const {watchlist} = useSelector(( state: RootState ) => state.watchList)

  const dispatch = useDispatch()


  const addItemToWatchList = () => {
    dispatch(addItem({poster_path, title, id}))
  }

  const removeWatchListItem = () => {
    dispatch(removeItem(id))
  }


  return (

    <div className={'relative flex flex-col justify-between rounded-[10px] bg-[#141414] w-[150px] h-[280px] mx-[10px] my-[30px]'}>
      <Link to={`/movie/${id}`}>

        <img
          className={
          'block rounded-[6px] m-auto w-[150px] h-[220px] hover:scale-105 duration-300 origin-bottom'
        }
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt=""
        />

      </Link>
      <div className={'overflow-hidden overflow-ellipsis whitespace-nowrap text-[14px] mt-1 font-[500]'}>{title}</div>

      {/*<div className={'absolute text-center w-[40px] h-[40px] rounded-full bg-indigo-500 right-[4px] top-[4px]'}>{vote_average}</div>*/}


      {
        watchlist.find((obj) => obj.id === id) ?
          <button
            onClick={removeWatchListItem}
            className={'flex items-center justify-between cursor-pointer w-full h-[30px] text-white p-[10px] rounded-[5px] bg-indigo-500 m-auto text-[14px] font-[700]'}>
            <span>remove</span>
            <RemoveFromWl className={'text-white fill-white'} height={20} width={20}/>
          </button>

          :

          <button onClick={addItemToWatchList}
                  className={'flex items-center justify-between cursor-pointer w-full h-[30px] p-[10px] text-white rounded-[5px] text-[14px]  bg-indigo-500 m-auto font-[700]'}>
            <span>add</span>
            <AddToWl className={'text-white fill-white'} height={20} width={20}/>
          </button>
      }

    </div>

  )
}