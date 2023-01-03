// Constructor start
import React, { Component } from "react";

import Layout from "../components/Layout";
import Card from "../components/Card";
import { SkeletonLoading, LoadingAnimation } from "../components/Loading";
//import Hero from "../components/Hero";

interface DatasType {
  id: number;
  title: string;
  image: string;
  rating: number;
}

export default class Home extends Component {
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
          },
          {
            id: 2,
            title: "Black Adam",
            rating: 4,
            image:
              "https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
          },
          {
            id: 3,
            title: "Avatar",
            rating: 5,
            image:
              "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
          },
          {
            id: 4,
            title: "Savage Salvation",
            rating: 4,
            image:
              "https://image.tmdb.org/t/p/w500/fJRt3mmZEvf8gQzoNLzjPtWpc9o.jpg",
          },
          {
            id: 5,
            title: "The Woman King",
            rating: 5,
            image:
              "https://image.tmdb.org/t/p/w500/438QXt1E3WJWb3PqNniK0tAE5c1.jpg",
          },
          {
            id: 6,
            title: "Glass Onion: A Knives Out Mystery",
            rating: 4,
            image:
              "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
          },
          {
            id: 7,
            title: "Violent Night",
            rating: 5,
            image:
              "https://image.tmdb.org/t/p/w500/1XSYOP0JjjyMz1irihvWywro82r.jpg",
          },
          {
            id: 8,
            title: "Black Panther: Wakanda Forever",
            rating: 5,
            image:
              "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
          },
        ],
        loading: false,
      });
    }, 1000);
  }

  render() {
    return (
      <Layout>
        <div className="grid grid-cols-4 gap-3">
          {this.state.loading ? (
            <SkeletonLoading />
          ) : (
            this.state.datas.map((data: DatasType) => (
              <Card
                key={data.id}
                title={data.title}
                image={data.image}
                rating={data.rating}
              />
            ))
          )}
        </div>
      </Layout>
    );
  }
}
