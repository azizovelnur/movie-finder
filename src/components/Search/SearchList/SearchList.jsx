import React from 'react';
import SearchListStyle from './SearchList.module.scss'
import {Link} from "react-router-dom";

const SearchList = ({id, poster_path, title}) => {

  const titleUrl = title.replace(/\s/g, '-')

  return (
    <Link className={SearchListStyle.link} to={`movie/${id}${titleUrl}`}>
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