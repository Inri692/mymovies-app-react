import { Link } from "react-router-dom";
import { ThemeContext } from "../utils/context";
import { useContext } from "react";
import Button2 from "./Button2";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleTheme() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }
  return (
    <div>
      <div className="navbar bg-[#52525b] dark:bg-[#52525b]">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-2xl text-white">
            <Link to="/">Nonton</Link>
          </a>

          <div className="flex justify-center">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered flex justify-center"
              />
            </div>
          </div>
        </div>

        <div className="flex-none gap-4">
          <div>
            <ul className="px-4">
              <li>
                <a href="" className="text-white">
                  <Link to="/favorites">Favorite</Link>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <Button2 label="" onClick={() => handleTheme()} />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
