import React, { useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length - 1)
                ]);
        }
        fetchData();
    }, [])

    function truncate(str, n){  //This function checks for the text till n, if the text is greater than n than it just puts ...  AS SIMPLE AS THAT BOOM. It accepts the string and the length
        return str?.length > n ? str.substr(0, n - 1) + "..." : str; 
    }

    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, //the ?.is so that incase the movie is undefined the site wont behave abnormally. It would just handle it elegantly.
            backgroundPosition: "center center"
        }}>
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                    {/*Since the apis do not always return precise information, that is why we are using 3 options for name*/ }
                    </h1>

                    <div className="banner_buttons">
                        <button className="banner_button">Play</button>
                        <button className="banner_button">My List</button>
                    </div>
                    
                    <h1 className="banner_description">
                        {truncate(movie?.overview, 150)}
                    </h1>
            </div>

        <div className="banner_fadeBottom">

        </div>

        </header>
    )
}

export default Banner
