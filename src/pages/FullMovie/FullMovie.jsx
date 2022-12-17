import React, {useEffect, useState} from 'react'
// import fullMovieStyle from './FullMovie.module.scss'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import YouTube from "react-youtube";
import {ReactComponent as ClosePlayerIcon} from '../../assets/close-player.svg'
import {ReactComponent as WatchListIcon} from '../../assets/watchlist-icon.svg'
import {ReactComponent as OpenPlayerIcon} from '../../assets/open-player.svg'
import {ReactComponent as NoImageFullMovie} from '../../assets/no-image-fullmovie.svg'
import {ReactComponent as AddToWl} from '../../assets/favorite-add-icon.svg'
import {ReactComponent as RemoveFromWl} from '../../assets/favorite-remove-icon.svg'
import {addItem, removeItem} from "../../redux/watchlistSlice/watchlistSlice";
import {useDispatch, useSelector} from "react-redux";

const FullMovie = () => {

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
        className={'absolute left-[50%] translate-x-[-50%]'}
        videoId={`${movieTrailer}`}
        opts={{
          width: '600px',
          height: '400px',
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
      className={"after:absolute after:bg-[#3a3734] after:z-[-1] after:inset-0 after:opacity-90 relative flex items-center my-[30px] h-[600px] isolate rounded-[20px]"}
      style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${fullMovie.backdrop_path})`}}
    >


      <div className={'flex justify-between items-center mx-[30px]'}>

        {
          playerTrailer && watchTrailer()
        }
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

        <div className={'h-[450px] w-[800px] ml-[37px]'}>

            <h2 className={'text-[30px] mr-[40px] mb-[20px]'}>{fullMovie.title}</h2>
          <div className={'flex items-center'}>
            <div className={'bg-[#1c1c1c] rounded-[4px] p-[4px] ml-[10px] cursor-pointer'}>Release {fullMovie.release_date}</div>
            <div className={'bg-[#1c1c1c] rounded-[4px] p-[4px] ml-[10px] cursor-pointer'}>Runtime {fullMovie.runtime}</div>
            <div className={'bg-[#1c1c1c] rounded-[4px] p-[4px] ml-[10px] cursor-pointer'}>Rating {fullMovie.vote_average}</div>
          </div>


          <div className={'mt-[100px] text-[16px]'}>
            <h3 className={'text-[26px] mb-[10px]'}>Overview</h3>
            {fullMovie.overview}
          </div>


          <div className={'flex justify-between'}>
            <button className={'flex items-center p-[10px] border-none text-[18px] cursor-pointer rounded-[10px] mt-[80px]'} onClick={() => setPlayerTrailer(true)}><OpenPlayerIcon
              height={40} width={40}/>Open Trailer
            </button>


            {
              watchlist.find((obj) => obj.id === Number(id))
                ?
                <button
                  className={'flex items-center border-none cursor-pointer rounded-[10px] mt-[80px] text-[18px] bg-[#1c1c1c]'} onClick={removeFromWatchList}>remove from
                  watchlist <RemoveFromWl className={''} height={40} width={50}/></button>
                :
                <button className={'flex items-center border-none cursor-pointer rounded-[10px] mt-[80px] text-[18px] bg-[#1c1c1c]'} onClick={addItemToWatchList}>Add to
                  watchlist<AddToWl className={''} height={40} width={50}/></button>
            }


          </div>

          <button className={playerTrailer ? 'absolute top-[20px] right-[30px] block cursor-pointer bg-none border-none' : 'hidden'}
                  onClick={() => setPlayerTrailer(false)}><ClosePlayerIcon height={40} width={40}/></button>


        </div>


      </div>


    </section>

  )
}

export default FullMovie