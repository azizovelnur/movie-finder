import React, {useCallback, useEffect, useRef, useState} from 'react';
import SearchS from './Search.module.scss'
import find from '../../assets/find.svg'
import {setSearchValue} from "../../redux/searchMoviesSlice/searchMoviesSlice";
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash/debounce";
import SearchList from "./SearchList/SearchList";
import {useLocation} from "react-router-dom";
import DropDown from "./DropDown/DropDown";


const Search = () => {
  const {searchMoviesData} = useSelector((state) => state.searchMovies)

  const [searchMovie, setSearchMovie] = useState('')
  const dispatch = useDispatch()


  const addSearchValue = useCallback(
    debounce((findValue) => {
      dispatch(setSearchValue(findValue))
    }, 1000),
    []
  )

  const onChangeInput = (event) => {
    setSearchMovie(event.target.value)
    addSearchValue(event.target.value)
  }

  const inputRef = useRef()
  const searchRes = useRef()
  const findIcon = useRef()

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (
        !event.composedPath().includes(searchRes.current)
        &&
        !event.composedPath().includes(inputRef.current)
        &&
        !event.composedPath().includes(findIcon.current)

      ) {
        setSearchMovie('')
      }
    }

    document.body.addEventListener('click', handleClickOutside)


  }, [])


  return (
    <>
      <div className={SearchS.search}>
        <img ref={findIcon} className={SearchS.search__find} src={find} alt="find"/>
        <input
          ref={inputRef}
          className={SearchS.search__input}
          value={searchMovie}
          onChange={onChangeInput}
          type="text"
          placeholder={'find movie...'}
        />
        {
          (searchMovie !== '') ?

            <div ref={searchRes} className={SearchS.result}>
              {searchMoviesData.map((obj) => <SearchList key={obj.id} {...obj}/>)}
            </div>

            : ''
        }
      </div>
    </>
  )
}

export default Search