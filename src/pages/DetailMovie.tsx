import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
//import { withRouter } from "../utils/navigation";
import { MovieType, VideosType } from "../utils/types/movie";
import Loading from "../components/Loading";
import { useTitle } from "../utils/hooks/hooks";
interface PropsType {
  params?: any;
}

interface StateType {
  loading: boolean;
  data: MovieType;
  videos: VideosType[];
}

const DetailMovie = () => {
  const { id_movie } = useParams();
  // const params = useParams(); // params.id_movie
  const [data, setData] = useState<MovieType>({});
  const [videos, setVideos] = useState<VideosType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useTitle(`${data.title} - Nonton`);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(
      `https://api.themoviedb.org/3/movie/${id_movie}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&append_to_response=videos`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setVideos(data.videos?.results);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className=" w-full h-[100vh] bg-cover  "
            style={{
              backgroundImage: `url(${`https://image.tmdb.org/t/p/original${data.backdrop_path})`}`,
            }}
          >
            <div className="flex justify-center">
              <div className="md:flex flex-row max-w-4xl bg-white shadow-lg bg-opacity-60">
                <img
                  className="rounded-3xl p-3 rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="my-10 text-black text-2xl font-medium mb-2">
                    <div className="font-semibold">{data.title}</div>
                  </div>
                  <div className="my-4 font-bold">
                    Release Date
                    <p className=" text-black font-normal">
                      {" "}
                      {data.release_date}
                    </p>
                  </div>
                  <div className="my-4 font-bold">
                    Duration
                    <p className="text-black font-normal">
                      {data.runtime} minutes
                    </p>
                  </div>
                  <div className="my-4 font-bold">
                    Genre{" "}
                    <p className="text-black font-normal">
                      {data.genres
                        ?.map((genre) => {
                          return genre.name;
                        })
                        .join(", ")}
                    </p>
                  </div>
                  <div className="my-4 font-bold">
                    Description
                    <div className="text-black font-normal">
                      {data.overview}
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="font-bold">Rating</p>
                    <p className="text-xl font-normal">{data.vote_average}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Carousel
            datas={videos.slice(0, 5)}
            content={(data) => (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${data.key}`}
                title={data.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          />
        </>
      )}
    </Layout>
  );
};

export default DetailMovie;
