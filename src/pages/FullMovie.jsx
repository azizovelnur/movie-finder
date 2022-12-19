import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import YouTube from "react-youtube";
import {ReactComponent as ClosePlayerIcon} from '../assets/icons/close-player.svg'
import {ReactComponent as WatchListIcon} from '../assets/icons/watchlist-icon.svg'
import {ReactComponent as OpenPlayerIcon} from '../assets/icons/open-player.svg'
import {ReactComponent as NoImageFullMovie} from '../assets/icons/no-image-fullmovie.svg'
import {ReactComponent as AddToWl} from '../assets/icons/favorite-add-icon.svg'
import {ReactComponent as RemoveFromWl} from '../assets/icons/favorite-remove-icon.svg'
import {addItem, removeItem} from "../redux/watchlistSlice";
import {useDispatch, useSelector} from "react-redux";

export const FullMovie = () => {

  const [fullMovie, setFullMovie] = useState({})
  const [movieTrailer, setMovieTrailer] = useState('')
  const [playerTrailer, setPlayerTrailer] = useState(false)
  const {watchlist} = useSelector(state => state.watchList)

  const {id} = useParams()

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchFullMovie = async () => {
      try {
        const fullMovieData = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=dfd3c55a40f798c4ac314d4aeaf609ea`)
        setFullMovie(fullMovieData.data)
      } catch (err) {
        // navigateHome('/')
        console.log(err)
      }
    }

    fetchFullMovie()

  }, [])

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=dfd3c55a40f798c4ac314d4aeaf609ea&append_to_response=videos`)
        setMovieTrailer(data.data.videos.results[0].key)
      } catch (err) {
        console.log(err)
      }
    }
    fetchMovieTrailer()
  }, [])


  const watchTrailer = () => {
    return (
      <YouTube
        className={'z-50 absolute left-[50%] translate-x-[-50%]'}
        videoId={`${movieTrailer}`}
        opts={{
          width: '700px',
          height: '500px',
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
      className={playerTrailer === true ? "after:absolute after:bg-[#000]  after:inset-0 after:opacity-100 after:rounded-[20px] relative flex items-center my-[30px] h-[600px] rounded-[20px] isolate bg-black"
        : "after:absolute after:bg-[#3a3734] after:z-[-1] after:inset-0 after:opacity-90 after:rounded-[20px] relative flex items-center my-[30px] h-[600px] rounded-[20px] isolate"}
      style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${fullMovie.backdrop_path})`}}
    >

        {
          playerTrailer && watchTrailer()
        }

      <div className={'flex justify-between items-center mx-[30px]'}>

        <div>

          {
            fullMovie.poster_path !== null || undefined ?
              <img
                className={'rounded-[10px]'}
                src={`https://image.tmdb.org/t/p/w300/${fullMovie.poster_path}`}
                alt=""
              /> : <NoImageFullMovie/>
          }
        </div>

        <div className={'flex flex-col justify-between h-[450px] w-[800px] ml-[37px]'}>

          <div>
            <h2 className={'text-[30px] font-[700] mb-[14px]'}>{fullMovie.title}</h2>
            <div className={'flex items-center'}>
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


          <div className={'flex justify-between'}>
            <button
              className={'flex items-center p-[10px] border-none text-[18px] cursor-pointer rounded-[10px] bg-[#1c1c1c]'}
              onClick={() => setPlayerTrailer(true)}><OpenPlayerIcon
              height={40} width={40}/>Open Trailer
            </button>

            <button
              className={playerTrailer ? 'z-40 absolute top-[20px] right-[30px] block cursor-pointer bg-none border-none' : 'hidden'}
              onClick={() => setPlayerTrailer(false)}><ClosePlayerIcon className={'fill-white cursor-pointer'} height={40} width={40}/>
            </button>

            {
              watchlist.find((obj) => obj.id === Number(id))
                ?
                <button
                  className={'flex items-center justify-between text-[14px] border-none cursor-pointer rounded-[10px] text-[18px] bg-[#1c1c1c] p-[10px] w-[280px]'}
                  onClick={removeFromWatchList}><span>remove from</span>
                  watchlist <RemoveFromWl className={'fill-white'} height={40} width={50}/></button>
                :
                <button
                  className={'flex items-center justify-between text-[14px] border-none cursor-pointer rounded-[10px] p-[10px] text-[18px] bg-[#1c1c1c] w-[280px]'}
                  onClick={addItemToWatchList}><span>Add to
                  watchlist</span><AddToWl className={'fill-white'} height={40} width={50}/></button>
            }

          </div>

        </div>

      </div>

    </section>

  )
}
