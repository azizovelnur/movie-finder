import React from 'react'
import {Link} from "react-router-dom"
import {ReactComponent as NoImageFullMovie} from '../../../assets/icons/no-image-fullmovie.svg'


type TsearchListProps = {
  id: number,
  poster_path: string,
  title: string
}
export const SearchList = ({id, poster_path, title}: TsearchListProps) => {
  return (
    <Link className={'no-underline'} to={`movie/${id}`}>
      <div className={'flex justify-between items-center m-[10px] cursor-pointer text-[14px] bg-[#181717] hover:bg-[#000]'}>
        { (poster_path !== null || undefined) ?
          <img
          className={'h-[60px] w-[40px] mr-[20px]'}
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt=""
        />
        : <NoImageFullMovie width={40} height={60}/>
        }
        <div className={'text-[14px] text-right'}>{title}</div>
      </div>
    </Link>
  )
}
