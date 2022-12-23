import React, {useCallback, useEffect, useRef, useState} from 'react';
import find from '../../assets/icons/find.svg'
import {ReactComponent as DeleteTextInput} from '../../assets/icons/close-player.svg'
import {setSearchValue} from "../../redux/searchMovies/searchMoviesSlice";
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash/debounce"
import {SearchList} from "./SearchList/SearchList"
import {SkeletonSearchList} from "../Skeleton";

export const Search = () => {
  const {searchMoviesData} = useSelector((state) => state.searchMovies)

  const {status} = useSelector((state) => state.searchMovies)
  const [searchMovie, setSearchMovie] = useState('')
  const dispatch = useDispatch()

  const skeletonSearchList = [...new Array(20)].map((_, index) => <SkeletonSearchList key={index}/>)

  const searchMovies = searchMoviesData.map((obj) => <SearchList key={obj.id} {...obj}/>)

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

  const inputBlockRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(inputBlockRef.current)) {
        setSearchMovie('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  return (
    <div ref={inputBlockRef} className={'relative'}>
      <img className={'absolute h-[26px] w-[26px] opacity-70 top-[4px] left-[6px]'} src={find} alt="find"/>
      <DeleteTextInput
        onClick={() => setSearchMovie('')}
        className={searchMovie === '' ?
          'hidden absolute h-[26px] cursor-pointer w-[26px] fill-white opacity-70 top-[4px] right-[6px]' :
          'block absolute h-[26px] cursor-pointer w-[26px] fill-white opacity-70 top-[4px] right-[6px]'}/>
      <input
        className={'pl-[42px] pr-[38px] w-[350px] h-[38px] rounded-[10px] border-none outline-none bg-[#090909]'}
        value={searchMovie}
        onChange={onChangeInput}
        type="text"
        placeholder={'find movie...'}
      />

      {
        (searchMovie !== '') &&

        <div
          className={'absolute block overflow-scroll overflow-x-hidden bg-[#000] top-[44px] h-[400px] w-full rounded-[4px]'}>
          {
            (status === 'loading') ? skeletonSearchList : (status === 'error') ? <div className={'text-center text-[32px] mt-[30%]'}>Not found</div> : searchMovies
          }
        </div>

      }
    </div>
  )
}
