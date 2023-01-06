// Constructor start
import React, { Component } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { CircleLoading } from "../components/Loading";
//import Carousel from "../components/Carousel";
import { MovieType } from "../utils/types/movie";

// interface DatasType {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
// }
interface PropsType {}
interface StateType {
  loading: boolean;

  datas: MovieType[];
  page: number;
  totalPage: number;
}
export default class Home extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      datas: [],
      loading: true,
      page: 1,
      totalPage: 1,
    };
  }

  componentDidMount() {
    this.fetchData(1);
  }

  fetchData(page: number) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=${page}`
      )
      .then((data) => {
        const { results, total_pages } = data.data;
        this.setState({ datas: results, totalPage: total_pages });
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  nextPage() {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
    this.fetchData(newPage);
  }

  prevPage() {
    const newPage = this.state.page - 1;
    this.setState({ page: newPage });
    this.fetchData(newPage);
  }

  handleFavorite(data: MovieType) {
    const checkExist = localStorage.getItem("FavMovie");
    if (checkExist) {
      /*
      TODO: Sebelum ditambahkan ke list favorit, silahkan buat pengkondisian/cek terlebih dahulu apakah film yang dipilih sudah ditambahkan atau belum, kasih alert jika ada, jika tidak silahkan push datanya ke localstorage
      */
      let parseFav: MovieType[] = JSON.parse(checkExist);
      parseFav.push(data);
      localStorage.setItem("FavMovie", JSON.stringify(parseFav));
    } else {
      localStorage.setItem("FavMovie", JSON.stringify([data]));
      alert("Movie added to favorite");
    }
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
            {this.state.datas.map((data) => (
              <Card
                key={data.id}
                title={data.title}
                poster_path={data.poster_path}
                vote_average={data.vote_average}
                id={data.id}
                labelButton="ADD TO FAVORITE"
                onClickFav={() => this.handleFavorite(data)}
              />
            ))}
          </div>
        )}
      </Layout>
    );
  }
}
