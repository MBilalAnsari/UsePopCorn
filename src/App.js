import { useEffect, useState } from "react";

export default function App() {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [movies, SetMovies] = useState([]);
  const [id, setId] = useState("")
  const [singleMovie, setSingleMovie] = useState([])
  const [search, setSearch] = useState("");
  const getMovies = async () => {

    const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=2069fe59`)

    const data = await response.json()
    console.log(data)

    SetMovies(data.Search)
    // setId(data?.Search?.imdbID || "");
    // console.log(id, '===>>nid')

    console.log(movies, "data araha hai")

  }
  useEffect(() => {

    getMovies();
  }, [search])

  const onMovieClick = (movie) => {
    console.log(movie, "movie clicked")
    setId(movie.imdbID)
    setSingleMovie(movie)

  }

  return (

    <>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
        <p className="num-results">
        
          Found <strong>{movies?.length > 0 ? movies.length : 0}</strong> results
        </p>
      </nav>

      <main className="main">
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list" >
              {movies?.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} onClick={() => onMovieClick(movie)} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>{movie.Type}</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              {
              id ? 
              (<ul className="list">
        
                  <li key={singleMovie.imdbID}>
                    <img src={singleMovie.Poster} alt={`${singleMovie.Title} poster`} />
                    <h3>{singleMovie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span></span>
                        <span>{singleMovie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{singleMovie.userRating}</span>
                        <span></span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span> min</span>
                        <span>{singleMovie.runtime}</span>
                      </p>
                    </div>
                  </li>
              </ul>) : (<h1 className='text-center'></h1>)
              }
            </>
          )}
        </div>
      </main>
    </>
  );
}
