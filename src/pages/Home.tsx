// Constructor start
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Loading from "../components/Loading";
//import Carousel from "../components/Carousel";
import { MovieType } from "../utils/types/movie";
import { useTitle } from "../utils/hooks/hooks";
import Button3 from "../components/Button3";
import Banner from "../components/Banner";

interface PropsType {}
interface StateType {
  loading: boolean;

  datas: MovieType[];
  page: number;
  totalPage: number;
}

const Home = () => {
  useTitle("Nonton - Home Page");
  const [datas, setDatas] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(2);
  //const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    fetchData(1);
  }, []);

  function fetchData(page: number) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&page=${page}`
      )
      .then((data) => {
        // const { results, total_pages } = data.data;
        // this.setState({ datas: results, totalPage: total_pages });
        const { results, total_page } = data.data;
        setDatas(results);
        //setTotalPage(total_page);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  // function nextPage() {
  //   const newPage = page + 1;
  //   setPage(newPage);
  //   fetchData(newPage);
  // }

  // function prevPage()
  //   const newPage = page - 1;
  //   setPage(newPage);
  //   fetchData(newPage);
  // }

  function handleFavorite(data: MovieType) {
    const checkExist = localStorage.getItem("FavMovie");
    // if (checkExist) {
    //const parseFav: MovieType[] = JSON.parse(checkExist);
    //   const find = parseFav.find((data) => data.id === data.id);
    //   if (find) {
    //     alert("The Movie is already in favorite");

    //   }
    // }
    if (checkExist) {
      let parseFav: MovieType[] = JSON.parse(checkExist);
      // const find = parseFav.find((data) => data.id === data.id);
      // if (find) {
      //   alert("The Movie is already in favorite");
      // }
      parseFav.push(data);
      localStorage.setItem("FavMovie", JSON.stringify(parseFav));
      alert("Movie added to favorite");
    } else {
      localStorage.setItem("FavMovie", JSON.stringify([data]));
      //alert("Movie added to favorite");
    }
  }
  function nextPage() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const newPage = page + 1;
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US&page=${page}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        const { results } = res;
        const result = datas.slice();
        result.push(...results);
        setDatas(result);
        setPage(newPage);
      })
      .catch((error) => alert(error.toString()));
  }

  return (
    <>
      <Layout>
        <Banner />

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

        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {datas.map((data) => (
              <Card
                key={data.id}
                title={data.title}
                poster_path={data.poster_path}
                vote_average={data.vote_average}
                id={data.id}
                labelButton="ADD TO FAVORITE"
                onClickFav={() => handleFavorite(data)}
              />
            ))}
          </div>
        )}
        <Button3 onClick={() => nextPage()}></Button3>
      </Layout>
    </>
  );
};
export default Home;
