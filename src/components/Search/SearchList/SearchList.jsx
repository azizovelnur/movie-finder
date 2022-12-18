import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {SkeletonSearchList} from "../../Skeleton";
import {ReactComponent as NoImageFullMovie} from '../../../assets/no-image-fullmovie.svg'

const SearchList = ({id, poster_path, title}) => {

  const {status} = useSelector((state) => state.searchMovies)

  return (

    ( status === 'loading' ) ? <SkeletonSearchList/> :

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

  );
};

export default SearchList;