import React from 'react';
import SearchListStyle from './SearchList.module.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {SkeletonsSearchList} from "../../Skeleton/Skeleton";

const SearchList = ({id, poster_path, title}) => {

  const {status} = useSelector((state) => state.searchMovies)
  // const titleUrl = title.replace(/\s/g, '-')
  console.log(status)
  return (

    ( status === 'loading' || status === '' ) ? <SkeletonsSearchList/> :

    <Link className={SearchListStyle.link} to={`movie/${id}`}>
      <div className={SearchListStyle.item}>

        <img
          className={SearchListStyle.item__img}
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt=""
        />


        <div className={SearchListStyle.item__title}>{title}</div>

      </div>
    </Link>

  );
};

export default SearchList;