import React, {useEffect, useState} from 'react'
import fullMovieStyle from './FullMovie.module.scss'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const FullMovie = () => {

  const [fullMovie, setFullMovie] = useState({})
  const {id} = useParams()
  const navigateHome = useNavigate()

  console.log(fullMovie)


  console.log(id)

  useEffect(() => {
    const fetchFullMovie = async () => {
      try {
        const fullMovieData = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=dfd3c55a40f798c4ac314d4aeaf609ea`)
        setFullMovie(fullMovieData.data)
      } catch (err) {
        navigateHome('/')
        console.log(err)
      }
    }

    fetchFullMovie()

  }, [])


  return (


    <section
      className={fullMovieStyle.fullMovie}
      style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${fullMovie.backdrop_path})`}}
    >
      {/*<img src={`https://image.tmdb.org/t/p/w1280/${fullMovie.backdrop_path}`} alt=""/>*/}

      <div className={fullMovieStyle.items}>

        <div className={fullMovieStyle.imgBlock}>

          <img
            className={fullMovieStyle.imgBlock__image}
            src={`https://image.tmdb.org/t/p/w300/${fullMovie.poster_path}`}
            alt=""
          />
        </div>

        <div className={fullMovieStyle.moreInfoBlock}>
          <h2 className={fullMovieStyle.moreInfoBlock__title}>{fullMovie.title}</h2>
          <div className={fullMovieStyle.moreInfoBlock__overview}>{fullMovie.overview}</div>
          <button>Play Trailer</button>
        </div>


      </div>


    </section>

  )
}

export default FullMovie