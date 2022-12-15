import React, {useEffect, useState} from 'react'
import fullMovieStyle from './FullMovie.module.scss'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import YouTube from "react-youtube";
import {ReactComponent as ClosePlayerIcon} from '../../assets/close-player.svg'
import {ReactComponent as WatchListIcon} from '../../assets/watchlist-icon.svg'
import {ReactComponent as OpenPlayerIcon} from '../../assets/open-player.svg'
import {ReactComponent as addToWl} from '../../assets/favorite-add-icon.svg'
import {ReactComponent as removeFromWl} from '../../assets/favorite-remove-icon.svg'
import {addItem, findMovieById, setSavedMovies} from "../../redux/watchlistSlice/watchlistSlice";
import {useDispatch, useSelector} from "react-redux";

const FullMovie = () => {

  const [fullMovie, setFullMovie] = useState({})
  const [movieTrailer, setMovieTrailer] = useState('')
  const [playerTrailer, setPlayerTrailer] = useState(false)



  const {id} = useParams()
  const savedMovie = useSelector(findMovieById(Number(id)))
  const isSaved = savedMovie?.isSaved === true ? 'Remove from Watchlist' : 'Add to Watchlist'

  // const [isLoadingGenres, setIsLoadingGenres] = useState(false)
  // const navigateHome = useNavigate()
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
        // setIsLoadingGenres(true)
      } catch (err) {
        console.log(err)
      }
    }
    fetchMovieTrailer()
  }, [])


  const watchTrailer = () => {
    return (
      <YouTube
        className={fullMovieStyle.ytBlock}
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
    dispatch(setSavedMovies())
  }


  return (


    <section
      className={fullMovieStyle.fullMovie}
      style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${fullMovie.backdrop_path})`}}
    >


      <div className={fullMovieStyle.items}>

        {
          playerTrailer && watchTrailer()
        }
        <div className={fullMovieStyle.imgBlock}>

          <img
            className={fullMovieStyle.imgBlock__image}
            src={`https://image.tmdb.org/t/p/w300/${fullMovie.poster_path}`}
            alt=""
          />
        </div>

        <div className={fullMovieStyle.moreInfoBlock}>

          <div className={fullMovieStyle.moreInfoBlock__titleWrapper}>
            <h2 className={fullMovieStyle.moreInfoBlock__title}>{fullMovie.title}</h2>
            <div className={fullMovieStyle.moreInfoBlock__releaseDate}>Release {fullMovie.release_date}</div>
            <div className={fullMovieStyle.moreInfoBlock__runtime}>Runtime {fullMovie.runtime}</div>
            <div className={fullMovieStyle.moreInfoBlock__rating}>Rating {fullMovie.vote_average}</div>

            {/*{*/}
            {/*  isLoadingGenres ? <div className={fullMovieStyle.moreInfoBlock__genres}>*/}
            {/*  genres {fullMovie.genres.map((value) => <div key={value.id}>{value.name}</div>)}*/}
            {/*  </div> : <div></div>*/}
            {/*}*/}


          </div>


          <div className={fullMovieStyle.moreInfoBlock__overview}>
            <h3>Overview</h3>
            {fullMovie.overview}
          </div>


          <div className={fullMovieStyle.buttons}>
            <button className={fullMovieStyle.btnOpenPlayer} onClick={() => setPlayerTrailer(true)}><OpenPlayerIcon
              height={40} width={40}/>Open Trailer
            </button>


            <button className={fullMovieStyle.btnAddToWatchList} onClick={addItemToWatchList}>

              {
                isSaved
              }
              <WatchListIcon height={30} width={30}/>

            </button>
          </div>

          <button className={playerTrailer ? fullMovieStyle.btnClosePlayer : fullMovieStyle.btnCloseHide}
                  onClick={() => setPlayerTrailer(false)}><ClosePlayerIcon height={40} width={40}/></button>


        </div>


      </div>


    </section>

  )
}

export default FullMovie