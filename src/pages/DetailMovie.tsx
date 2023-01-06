import React, { Component } from "react";

import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import { withRouter } from "../utils/navigation";
import { MovieType, VideosType } from "../utils/types/movie";
import { CircleLoading } from "../components/Loading";
interface PropsType {
  params?: any;
}

interface StateType {
  loading: boolean;
  data: MovieType;
  videos: VideosType[];
}

class DetailMovie extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      // state: default value
      data: {},
      videos: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { id_movie } = this.props.params;
    fetch(
      `https://api.themoviedb.org/3/movie/${id_movie}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&append_to_response=videos`,
      { method: "GET" }
    )
      .then((response) => response.json()) // untuk mengkonversi response menjadi json
      .then((data) => {
        // dia akan masuk ke then jikalau dia berstatus OK atau berhasil
        this.setState({ data, videos: data.videos.results }); // this.setState({ data: data });
      })
      .catch((error) => {
        // masuk catch ketika server mengirimkan status tidak berhasil
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <Layout>
        {this.state.loading ? (
          <CircleLoading />
        ) : (
          <>
            <div className="flex justify-center">
              <div className="md:flex flex-row max-w-4xl bg-white shadow-lg bg-opacity-60">
                <img
                  className="rounded-xl p-3 rounded-xl"
                  src={`https://image.tmdb.org/t/p/w500${this.state.data.poster_path}`}
                  alt=""
                />
                <div className="flex flex-col">
                  <div className="my-10 text-black text-2xl font-medium mb-2">
                    <div className="font-semibold">{this.state.data.title}</div>
                  </div>
                  <div className="my-4 font-bold">
                    Release Date
                    <p className="font-normal">
                      {" "}
                      {this.state.data.release_date}
                    </p>
                  </div>
                  <div className="my-4 font-bold">
                    Duration
                    <p className="font-normal">
                      {this.state.data.runtime} minutes
                    </p>
                  </div>
                  <div className="my-4 font-bold">
                    Genre{" "}
                    <p className="font-normal">
                      {this.state.data.genres
                        ?.map((genre) => {
                          return genre.name;
                        })
                        .join(", ")}
                    </p>
                  </div>
                  <div className="my-4 font-bold">
                    Description
                    <div className="font-normal">
                      {this.state.data.overview}
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="font-bold">Rating</p>
                    <p className="text-2xl font-extrabold">
                      {this.state.data.vote_average}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Carousel
              datas={this.state.videos.slice(0, 5)}
              content={(data) => (
                <iframe
                  width="100%"
                  height="315"
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
  }
}
export default withRouter(DetailMovie);
