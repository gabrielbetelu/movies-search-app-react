
import { useState } from 'react'

export const MovieSearch = () => {

  const urlBase = import.meta.env.VITE_urlBase;
  const API_Key = import.meta.env.VITE_API_Key;

  const [busqueda, setBusqueda] = useState('')
  const [peliculas, setPeliculas] = useState([])

  const handleInputChange = (e) => {
    setBusqueda(e.target.value)
  }

  const handleInputSubmit = (event) => {
    event.preventDefault()

    fetchPeliculas()
    
    setBusqueda('')
  }

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_Key}`)
      const data = await response.json()
      console.log(data.results)
      setPeliculas(data.results)
    } catch (error) {
      console.error('Se encontró el siguiente error: ', error)
    }
  }

  return (
    
      <div className="container">
        <h1 className="title">Buscador de películas</h1>
        <form onSubmit={handleInputSubmit}>
          <input
            placeholder='Película a buscar'
            type='text'
            value={busqueda}
            onChange={handleInputChange}
          />
          <button type='submit' className='search-button'>Buscar película</button>
        </form>
         <div className='movie-list'>
          {peliculas.map( (movie)  => (
            <div key={movie.id} className='movie-card'>              
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
          </div>
      </div>
    
  )
}
