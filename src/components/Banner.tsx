//import { HiStar } from "react-icons/hi";
import axios from "axios";
import { useState, useEffect } from "react";
import { MovieType } from "../utils/types/movie";

interface PropsType {}

interface StateType {
  movie: MovieType[];
  randomData: number;
}

const Banner = () => {
  const [movie, setMovie] = useState<MovieType[]>([]);
  const randomData = movie[Math.floor(Math.random() * movie.length)];

  useEffect(() => {
    getBanner();
  }, []);

  function getBanner() {
    axios
      .get(
        // `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        //   import.meta.env.VITE_API_KEY
        // }&language=en-US&page=1`
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`
      )
      .then((response) => {
        setMovie(response.data.results);
      })
      .catch((error) => alert(error.toString()));
  }

  return (
    <div
      className="carousel w-full bg-cover
       h-screen"
      style={{
        backgroundImage: `url(${`https://image.tmdb.org/t/p/original${randomData?.backdrop_path})`}`,
      }}
    >
      <div className="carousel w-full  bg-cover bg-gradient-to-t from-slate-900 via-slate-900/30  to-transparent">
        <div className="grid content-end p-5 w-[90vw] h-[80vh] pt-40  m-auto">
          <h1 className="text-5xl font-semibold mb-3 text-white/90">
            {randomData?.title}
          </h1>
          <div className="flex flex-wrap mb-3 text-white/90">
            <span className="font-semibold ">
              Rating: {randomData?.vote_average}
            </span>

            <span className="ml-4 font-semibold mb-3 text-white/90">
              Release Date:
              {randomData?.release_date}
            </span>
          </div>
          <p className="w-3/4 pt-2 font-semibold mb-3 text-white/90">
            {randomData?.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
