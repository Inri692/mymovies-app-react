import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Component } from "react";

import Home from "../pages/Home";
import DetailMovie from "../pages/DetailMovie";
import ListFavorite from "../pages/ListFavorite";

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

class App extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
