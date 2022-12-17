import React from 'react';
import SearchListStyle from './SearchList.module.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {SkeletonsSearchList} from "../../Skeleton/Skeleton";
import {ReactComponent as NoImageFullMovie} from '../../../assets/no-image-fullmovie.svg'

const SearchList = ({id, poster_path, title}) => {

  const {status} = useSelector((state) => state.searchMovies)
  // const titleUrl = title.replace(/\s/g, '-')
  console.log(status)
  return (

    ( status === 'loading' ) ? <SkeletonsSearchList/> :

    <Link className={SearchListStyle.link} to={`movie/${id}`}>
      <div className={SearchListStyle.item}>

        { (poster_path !== null || undefined) ?
          <img
          className={SearchListStyle.item__img}
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt=""
        />
        : <NoImageFullMovie width={40} height={60}/>
        }


        <div className={SearchListStyle.item__title}>{title}</div>

      </div>
    </Link>

  );
};

export default SearchList;