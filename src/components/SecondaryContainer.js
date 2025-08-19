import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  //console.log("POPULAR", movies.popularMovies);
  if (!movies.nowPlayingMovies || !movies.popularMovies) {
    return null;
  }
  return (
   
    <div className='bg-black'>
      <div className='-mt-52 pl-12 relative z-20'>
        {/*
        MovieList - Popular
        MovieCard * n
        MovieList - Now Playing
        MovieList - Trending
        MovieList - Horror
       */}
        <MovieList title={"Now Playing"} movies= {movies.nowPlayingMovies}/>
        <MovieList title={"Trending"} movies= {movies.nowPlayingMovies}/>
        <MovieList title={"Popular"} movies= {movies.popularMovies}/>
        <MovieList title={"Upcoming Movies"} movies= {movies.nowPlayingMovies}/>
        <MovieList title={"Horror"} movies= {movies.nowPlayingMovies}/>
      </div>
     
    </div>
  )
 
}

export default SecondaryContainer
