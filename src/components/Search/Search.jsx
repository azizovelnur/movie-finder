import React, {useCallback, useEffect, useState} from 'react';
import SearchS from './Search.module.scss'
import find from '../../assets/find.svg'
import {fetchMovies, setSearchValue} from "../../redux/movieSlice/movieSlice";
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash/debounce";
import Movies from "../Movies/Movies";
import SearchList from "./SearchList/SearchList"; //todo import from deboune.js


const Search = () => {
  const {movies} = useSelector((state) => state.movie)

  const [searchMovie, setSearchMovie] = useState('')
  const dispatch = useDispatch()

  const addSearchValue = useCallback(
    debounce( (findValue) => {
      dispatch(setSearchValue(findValue))
    }, 1000),
    []
  )

  const onChangeInput = (event) => {
    setSearchMovie(event.target.value)
    addSearchValue(event.target.value)
  }


  return (
    <>
      <div className={SearchS.search}>
        <img className={SearchS.search__find} src={find} alt="find"/>
        <input
          className={SearchS.search__input}
          value={searchMovie}
          onChange={onChangeInput}
          type="text"
          placeholder={'find movie...'}/>

        <div className={SearchS.result}>
          {
            movies.map((obj) => <SearchList key={obj.id} {...obj}/>)
          }
        </div>
      </div>
    </>
  )
}

export default Search