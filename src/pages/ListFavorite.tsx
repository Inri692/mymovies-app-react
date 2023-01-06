import React, { Component } from "react";

import { CircleLoading } from "../components/Loading";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { MovieType } from "../utils/types/movie";

interface PropsType {}

interface StateType {
  loading: boolean;
  datas: MovieType[];
}

export default class ListFavorite extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      // state: default value
      datas: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const getFavorite = localStorage.getItem("FavMovie");
    if (getFavorite) {
      this.setState({ datas: JSON.parse(getFavorite) });
    }
    this.setState({ loading: false });
  }

  removeFavorite(data: MovieType) {
    /*
    Menghapus data (object) di dalam sebuah array of object.
    TODO: Update tampilan ketika data sudah berhasil dihapus
    TODO: Tambahkan konfirmasi ulang sebelum melakukan penghapusan data untuk mencegah terjadinya salah klik
    */
    let dupeDatas: MovieType[] = this.state.datas.slice();
    const filterData = dupeDatas.filter((item) => item.id !== data.id);
    localStorage.setItem("FavMovie", JSON.stringify(filterData));
    alert(`Delete ${data.title} from favorite list`);
  }

  render() {
    return (
      <Layout>
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
                labelButton="REMOVE FROM FAVORITE"
                onClickFav={() => this.removeFavorite(data)}
              />
            ))}
          </div>
        )}
      </Layout>
    );
  }
}
