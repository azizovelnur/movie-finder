import React, {useCallback, useEffect, useRef, useState} from 'react';
import find from '../../assets/find.svg'
import {setSearchValue} from "../../redux/searchMoviesSlice/searchMoviesSlice";
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash/debounce";
import SearchList from "./SearchList/SearchList";
import {useLocation} from "react-router-dom";


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

    document.addEventListener('click', handleClickOutside)


  }, [])


  return (
      <div className={'relative'}>
        <img ref={findIcon} className={'absolute h-[26px] w-[26px] opacity-70 top-[4px] left-[6px]'} src={find} alt="find"/>
        <input
          ref={inputRef}
          className={'pl-[42px] w-[380px] h-[38px] rounded-[10px] border-none outline-none bg-[#090909]'}
          value={searchMovie}
          onChange={onChangeInput}
          type="text"
          placeholder={'find movie...'}
        />

        {
          (searchMovie !== '') &&

            <div
              ref={searchRes}
              className={'absolute block overflow-scroll overflow-x-hidden bg-[#1e1e1e] top-[44px] h-[400px] w-[380px] rounded-[4px]'}>
              {
                searchMoviesData.map((obj) => <SearchList key={obj.id} {...obj}/>)
              }
            </div>

        }
      </div>
  )
}

export default Search