import React, { Component } from "react";

import Layout from "../components/Layout";
//import Card from "../components/Card";
type GenreType = {
  id?: number;
  name?: string;
};
interface DataType {
  id?: number;
  title?: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  runtime?: number;
  genres?: GenreType[];
  vote_average?: number;
}
interface PropsType {}
interface StateType {
  loading: boolean;
  data: DataType;
}

export default class DetailMovie extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      data: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      `https://api.themoviedb.org/3/movie/683328?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <Layout>
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
                <p className="font-normal"> {this.state.data.release_date}</p>
              </div>
              <div className="my-4 font-bold">
                Duration
                <p className="font-normal">{this.state.data.runtime} minutes</p>
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
                <div className="font-normal">{this.state.data.overview}</div>
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
      </Layout>
    );
  }
}
