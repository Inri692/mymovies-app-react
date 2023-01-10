import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

import { useDispatch } from "react-redux/es/exports";

import Home from "../pages/Home";
import DetailMovie from "../pages/DetailMovie";
import ListFavorite from "../pages/ListFavorite";
import { ThemeContext } from "../utils/context";
import { setFavorites } from "../utils/redux/reducer/reducer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie/:id_movie",
    element: <DetailMovie />,
  },
  {
    path: "/favorites",
    element: <ListFavorite />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const getFavMovies = localStorage.getItem("FavMovie");
    if (getFavMovies) {
      dispatch(setFavorites(JSON.parse(getFavMovies)));
    }
  }, []);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default App;
