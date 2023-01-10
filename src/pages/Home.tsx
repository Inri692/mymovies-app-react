import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";
import Layout from "components/Layout";
import Card from "components/Card";
import Loading from "components/Loading";

import { setFavorites } from "utils/redux/reducer/reducer";
import { MovieType } from "utils/types/movie";
import { useTitle } from "utils/hooks/hooks";
import Button3 from "components/Button3";
import Banner from "../components/Banner";

interface PropsType {}
interface StateType {
  loading: boolean;

  datas: MovieType[];
  page: number;
  totalPage: number;
}

const Home = () => {
  const dispatch = useDispatch();
  useTitle("Nonton - Home Page");
  const [datas, setDatas] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(2);

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
        const { results, total_page } = data.data;
        setDatas(results);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
  }

  function handleFavorite(data: MovieType) {
    const checkExist = localStorage.getItem("FavMovie");

    if (checkExist) {
      let parseFav: MovieType[] = JSON.parse(checkExist);

      parseFav.push(data);
      localStorage.setItem("FavMovie", JSON.stringify(parseFav));
      dispatch(setFavorites(parseFav));
      alert("Movie added to favorite");
    } else {
      localStorage.setItem("FavMovie", JSON.stringify([data]));
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
  //
  return (
    <>
      <Layout>
        <Banner />
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 p-3 bg-opa stic lg:grid-cols-4 gap-5 p-5 md:grid-cols-3 sm:grid-cols-2 z-0 backdrop-blur-2xl ">
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
