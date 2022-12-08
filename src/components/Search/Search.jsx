import React, {useCallback, useEffect, useState} from 'react';
import SearchS from './Search.module.scss'
import find from '../../assets/find.svg'
import {fetchMovies, setSearchValue} from "../../redux/movieSlice/movieSlice";
import {useDispatch} from "react-redux";
import debounce from "lodash/debounce"; //todo import from deboune.js


const Search = () => {

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
      </div>
    </>
  )
}

export default Search