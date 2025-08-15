import { API_OPTIONS } from '../utils/constants'
import { addPopularMovies } from '../utils/moviesSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const usePopularMovies = ()=>{
 
 //fetch dataa from TMDB API and update store
  const dispatch = useDispatch();

 const getPopularMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
       API_OPTIONS
      );
    const json = await data.json();
    //console.log(json.results);
    dispatch(addPopularMovies(json.results));
 }

 useEffect(()=>{
  getPopularMovies();
 },[dispatch]);
    
}

export default usePopularMovies;