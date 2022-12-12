import React, {useCallback, useEffect, useRef, useState} from 'react';
import SearchS from './Search.module.scss'
import find from '../../assets/find.svg'
import {setSearchValue} from "../../redux/searchMoviesSlice/searchMoviesSlice";
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash/debounce";
import SearchList from "./SearchList/SearchList"; //todo import from deboune.js


const Search = () => {
  const {searchMoviesData} = useSelector((state) => state.searchMovies)

  const [searchMovie, setSearchMovie] = useState('')
  const dispatch = useDispatch()

  const searchRes = useRef()



  const addSearchValue = useCallback(
    debounce( (findValue) => {
      dispatch(setSearchValue(findValue))
    }, 1000),
    []
  )

  const onChangeInput = (event) => {
    setSearchMovie(event.target.value)
    addSearchValue(event.target.value)
    searchRes.current.style.display = 'block'
    if (event.target.value === '') {
      searchRes.current.style.display = 'none'
    }
  }



  useEffect(() => {

    const handleClickOutside = (event) => {
      if (!event.path.includes(searchRes.current)) {
        searchRes.current.style.display = 'none'
        setSearchMovie('')
      }
    }

    document.body.addEventListener('click', handleClickOutside)


  }, [])




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

        <div ref={searchRes} className={SearchS.result}>
          {
            searchMoviesData.map((obj) => <SearchList key={obj.id} {...obj}/>)
          }
        </div>
      </div>
    </>
  )
}

export default Search