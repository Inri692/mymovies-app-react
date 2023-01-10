import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Card from "../components/Card";

import { setFavorites } from "../utils/redux/reducer/reducer";
import { MovieType } from "../utils/types/movie";
import { useTitle } from "../utils/hooks/hooks";
import { RootState } from "../utils/types/redux";

interface PropsType {}

interface StateType {
  loading: boolean;
  datas: MovieType[];
}

const ListFavorite = () => {
  const dispatch = useDispatch();
  useTitle("Nonton - Favorite Page");
  const datas = useSelector((state: RootState) => state.data.favorites);
  // const [datas, setDatas] = useState<MovieType[]>([]);
  //const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // function fetchData() {
  //   const getFavorite = localStorage.getItem("FavMovie");
  //   if (getFavorite) {
  //     setDatas(JSON.parse(getFavorite));
  //   }
  //   setLoading(false);
  // }

  function removeFavorite(data: MovieType) {
    let dupeDatas: MovieType[] = datas.slice();
    const filterData = dupeDatas.filter((item) => item.id !== data.id);
    localStorage.setItem("FavMovie", JSON.stringify(filterData));
    dispatch(setFavorites(filterData));
    alert(`Delete ${data.title} from favorite list`);
  }

  return (
    <Layout>
      {/* {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : ( */}
      <div className="grid grid-cols-4 gap-3">
        {datas.map((data) => (
          <Card
            key={data.id}
            title={data.title}
            poster_path={data.poster_path}
            vote_average={data.vote_average}
            id={data.id}
            labelButton="REMOVE FROM FAVORITE"
            onClickFav={() => removeFavorite(data)}
          />
        ))}
      </div>
      {/* )} */}
    </Layout>
  );
};

export default ListFavorite;
