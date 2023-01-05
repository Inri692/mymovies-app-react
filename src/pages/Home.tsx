// Constructor start
import React, { Component } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { CircleLoading } from "../components/Loading";
//import Carousel from "../components/Carousel";

interface DatasType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
interface PropsType {}
interface StateType {
  loading: boolean;
  datas: DatasType[];
}
export default class Home extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      datas: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=1`
      )
      .then((data) => {
        const { results } = data.data;
        this.setState({ datas: results });
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <Layout>
        {/* {!this.state.loading && (
          <Carousel
            datas={this.state.datas.slice(0, 5)}
            content={(data) => (
              <div
                className="w-full h-full flex justify-center items-center bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.5),
                    rgba(0, 0, 0, 0.5)
                  ), url(https://image.tmdb.org/t/p/original${data.poster_path})`,
                }}
              >
                <p className="text-white tracking-widest font-bold break-words text-2xl">
                  {data.title}
                </p>
              </div>
            )}
          />
        )} */}
        {this.state.loading ? (
          <div className="w-full flex items-center justify-center">
            <CircleLoading />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {this.state.datas.map((data: DatasType) => (
              <Card
                key={data.id}
                title={data.title}
                poster_path={data.poster_path}
                vote_average={data.vote_average}
              />
            ))}
          </div>
        )}
      </Layout>
    );
  }
}
