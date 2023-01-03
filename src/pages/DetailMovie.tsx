import React, { Component } from "react";

import Layout from "../components/Layout";
import Card from "../components/Card";

interface DatasType {
  id: number;
  title: string;
  image: string;
  rating: number;
  durasi: string;
  release: string;
  overview: string;
  genre: string;
}

export default class DetailMovie extends Component {
  state = {
    datas: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    setTimeout(() => {
      this.setState({
        datas: [
          {
            id: 1,
            title: "Avatar: The Way of Water",
            rating: 5,
            image:
              "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            release: "2022-12-14",
            durasi: "160 minutes",
            genre: "Action, Adventure, Fantasy, Science Fiction",
            language: "en",
            overview:
              "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
          },
        ],
        loading: false,
      });
    }, 1000);
  }

  render() {
    return (
      <Layout>
        {this.state.datas.map((data: DatasType) => (
          <div className="flex justify-center">
            <div className="md:flex flex-row max-w-4xl bg-white shadow-lg bg-opacity-60">
              <img
                className="rounded-xl p-3 rounded-xl"
                src={data.image}
                alt=""
              />
              <div className="flex flex-col">
                <div className="my-10 text-black text-2xl font-medium mb-2">
                  <div className="font-semibold">{data.title}</div>
                </div>
                <div className="my-4 font-bold">
                  Release Date
                  <p className="font-normal"> {data.release}</p>
                </div>
                <div className="my-4 font-bold">
                  Duration
                  <p className="font-normal">{data.durasi} minutes</p>
                </div>
                <div className="my-4 font-bold">
                  Genre
                  <p className="font-normal">{data.genre}</p>
                </div>
                <div className="my-4 font-bold">
                  Description
                  <div className="font-normal">{data.overview}</div>
                </div>
                <div className="my-4">
                  <p className="font-bold">Rating</p>
                  <p className="text-2xl font-extrabold">{data.rating}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Layout>
    );
  }
}
