import React, {FC, useEffect, useState} from 'react'
import axios from "axios";
import {useParams} from "react-router-dom";
import YouTube from "react-youtube";
import {ReactComponent as ClosePlayerIcon} from '../assets/icons/close-player.svg'
import {ReactComponent as OpenPlayerIcon} from '../assets/icons/open-player.svg'
import {ReactComponent as NoImageFullMovie} from '../assets/icons/no-image-fullmovie.svg'
import {ReactComponent as AddToWl} from '../assets/icons/favorite-add-icon.svg'
import {ReactComponent as RemoveFromWl} from '../assets/icons/favorite-remove-icon.svg'
import {addItem, removeItem} from "../redux/watchListMovies/watchlistSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {API_URL} from "../utils/variables";

export const FullMovie: FC = () => {


  interface IfullMovie {
    id?: number
    title?: string
    poster_path?: string
    backdrop_path?: string

    release_date?: number
    runtime?: number
    vote_average?: number
    overview?: string
  }

  interface TTTfullMovie {
    videos: TResult
  }
  type Tvideos = {
    key: string
  }
  type TResult = {
    results : Tvideos[]
  }


  const [fullMovie, setFullMovie] = useState<IfullMovie>({})
  const [movieTrailer, setMovieTrailer] = useState('')
  const [playerTrailer, setPlayerTrailer] = useState(false)
  const {watchlist} = useSelector(( state: RootState ) => state.watchList)

  const {id} = useParams()

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchFullMovie = async () => {
      try {
        const {data} = await axios.get<IfullMovie>(`${API_URL}/movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_MOVIE_API_KEY
          }
        })
        setFullMovie(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchFullMovie()

  }, [])

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const { data } = await axios.get<TTTfullMovie>(`${API_URL}/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=videos`)
        console.log(data)
        setMovieTrailer(data.videos.results[0].key)
      } catch (err) {
        console.log(err)
      }
    }
    fetchMovieTrailer()
  }, [])


  const watchTrailer = () => {
    return (
      <YouTube
        className={'z-40 absolute left-[50%] translate-x-[-50%] w-full h-full'}
        videoId={`${movieTrailer}`}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    )
  }

  const addItemToWatchList = () => {
    dispatch(addItem({...fullMovie}))
  }

  const removeFromWatchList = () => {
    dispatch(removeItem(Number(id)))
  }


  return (


    <section
      className={ playerTrailer ? "after:absolute after:bg-[#000]  after:inset-0 after:opacity-100 after:rounded-[20px] relative flex flex-col lg:flex-row lg:text-start text-center items-center my-[30px] h-full lg:h-[600px] rounded-[20px] isolate bg-black"
        : "after:absolute after:bg-[#3a3734] after:z-[-1] after:inset-0 after:opacity-90 after:rounded-[20px] relative flex flex-col lg:flex-row lg:text-start text-center items-center my-[30px] h-full lg:h-[600px] rounded-[20px] isolate"}
      style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${fullMovie.backdrop_path})`}}
    >

        {
          playerTrailer && watchTrailer()
        }


        <div>

          {
            fullMovie.poster_path !== null || undefined ?
              <img
                className={'lg:mx-[20px] mt-[20px] rounded-[10px]'}
                src={`https://image.tmdb.org/t/p/w300/${fullMovie.poster_path}`}
                alt=""
              /> : <NoImageFullMovie/>
          }
        </div>

        <div className={'lg:w-[800px] lg:ml-[37px] flex flex-col justify-between h-[450px]'}>

          <div>
            <h2 className={'text-[30px] font-[700] mb-[14px]'}>{fullMovie.title}</h2>
            <div className={'lg:justify-start flex items-center justify-center'}>
              <div
                className={'bg-[#1c1c1c] rounded-[4px] p-[4px] mr-[10px] cursor-pointer'}>Release {fullMovie.release_date}</div>
              <div
                className={'bg-[#1c1c1c] rounded-[4px] p-[4px] mr-[10px] cursor-pointer'}>Runtime {fullMovie.runtime}</div>
              <div
                className={'bg-[#1c1c1c] rounded-[4px] p-[4px] mr-[10px] cursor-pointer'}>Rating {fullMovie.vote_average}</div>
            </div>
          </div>


          <div className={'text-[16px]'}>
            <h3 className={'text-[26px] mb-[10px]'}>Overview</h3>
            {fullMovie.overview}
          </div>


          <div className={'flex justify-between mb-[4px] mx-[4px]'}>
            <button
              className={'flex items-center p-[10px] border-none text-[18px] cursor-pointer rounded-[10px] bg-[#1c1c1c]'}
              onClick={() => setPlayerTrailer(true)}><OpenPlayerIcon
              height={40} width={40}/>Open Trailer
            </button>

            <button
              className={playerTrailer ? 'z-50 absolute top-[6px] bg-[#1e1e1e] cursor-pointer right-[6px] block cursor-pointer rounded-[4px] bg-none border-none' : 'hidden'}
              onClick={() => setPlayerTrailer(false)}>
              <ClosePlayerIcon className={'fill-white cursor-pointer h-[64px] w-[64px] opacity-50'}/>
            </button>

            {
              watchlist.find((obj) => obj.id === Number(id))
                ?
                <button
                  className={'flex items-center justify-between text-[14px] border-none cursor-pointer rounded-[10px] text-[18px] bg-[#1c1c1c] p-[10px] w-[150px]'}
                  onClick={removeFromWatchList}><span>remove</span>
                  <RemoveFromWl className={'fill-white'} height={40} width={50}/></button>
                :
                <button
                  className={'flex items-center justify-between text-[14px] border-none cursor-pointer rounded-[10px] p-[10px] text-[18px] bg-[#1c1c1c] w-[150px]'}
                  onClick={addItemToWatchList}><span>Add</span><AddToWl className={'fill-white'} height={40} width={50}/></button>
            }

          </div>

        </div>


    </section>

  )
}
