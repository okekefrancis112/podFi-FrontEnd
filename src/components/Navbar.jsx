import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faMagnifyingGlass,
  faSun,
  faMoon,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ConnectButton } from "@particle-network/connect-react-ui"; // @particle-network/connectkit to use Auth Core

const links = [
  { href: "/ads-marketplace", label: "Ads Marketplace" },
  { href: "/#features", label: "Features" },
];
const Navbar = ({ user, dark, setDark }) => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (show) {
      setShow(false);
    }

    //handle navigation to features
    if (location.hash) {
      const targetElement = document.getElementById(location.hash.substring(1));

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };
  return (
    <nav className="font-futuraMd navbar text-black px-10 xl:px-20 py-6 absolute top-0 left-0 z-10 h-36 dark:text-white">
      <NavLink
        to="/"
        className="mr-8 h-fit rounded-lg p-2 dark:border-2 dark:border-cyan-500"
      >
        <img src="/images/podfi.png" width={100} />
      </NavLink>
      <div className="flex justify-end gap-x-4 xl:justify-between w-full">
        {/* pages */}
        <ul className="gap-x-8 px-1 text-xl hidden xl:flex">
          {links.map((link, index, array) => {
            if (index === array.length - 1) {
              return (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-cyan-500">
                    {link.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive
                      ? "text-sky-900 bg-cyan-100 px-1 pb-0.5 rounded"
                      : "hover:text-cyan-500"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        {/* search bar */}
        <form
          className="ms-auto me-auto hidden md:flex relative text-sky-900 dark:text-blue-300"
          action=""
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-4 h-4 absolute top-4 left-3"
          />
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            className="input w-24 md:w-auto pl-9 placeholder-current border-current border-2 rounded-xl bg-transparent focus:border-cyan-500 focus:outline-cyan-500"
          />
        </form>
        {/* signup/in btns / wallet/ theme */}
        <div className="hidden xs:flex items-center gap-x-2">
          <ConnectButton />
          {user ? (
            <NavLink
              to={`/profile/${user.username}`}
              className="flex items-center gap-x-1 mr-12 text-xl hover:text-cyan-500"
            >
              <div className="rounded-full w-12 h-12 border-2 border-sky-900 overflow-hidden">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="user's profile picture"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
              <span
                className={
                  location.pathname === "/" ||
                  location.pathname === "/ads-marketplace"
                    ? "text-white"
                    : "text-sky-900 dark:text-white"
                }
              >
                {user.username}
              </span>
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={
                  location.pathname === "/" ||
                  location.pathname === "/ads-marketplace"
                    ? "underline text-white hover:text-cyan-500"
                    : "underline text-sky-900 dark:text-white hover:text-cyan-500"
                }
              >
                Sign up
              </NavLink>
              <NavLink
                to="/signin"
                className="text-white bg-cyan-500 hover:bg-cyan-600 py-2 px-4 rounded-xl"
              >
                Sign in
              </NavLink>
            </>
          )}
          <NavLink
            to="/earning"
            className={
              user
                ? "bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl"
                : "bg-cyan-800 hover:bg-cyan-900 p-3 rounded-xl"
            }
          >
            <img src="/images/wallet.svg" width={18} height={18} />
          </NavLink>
          {/* theme icon */}
          <button
            onClick={toggleTheme}
            className={
              location.pathname === "/" ||
              location.pathname === "/ads-marketplace"
                ? "hidden xl:inline text-white hover:text-cyan-500"
                : "hidden xl:inline text-sky-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-500"
            }
          >
            <FontAwesomeIcon icon={dark ? faSun : faMoon} className="w-6 h-6" />
          </button>
        </div>
        {/* toggler icon */}
        <div
          className={
            location.pathname === "/" ||
            location.pathname === "/ads-marketplace"
              ? "inline xl:hidden text-white"
              : "inline xl:hidden text-sky-900 dark:text-white"
          }
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="w-8 h-8 nav-icon-toggler"
                aria-expanded={show}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="w-8 h-8 nav-icon-toggler"
                aria-expanded={show}
              />
            )}
          </div>
        </div>
      </div>
      {/* dropdown */}
      <ul
        tabIndex={0}
        className={
          show
            ? "flex flex-col items-center gap-y-4 the-content py-8 text-center text-black bg-white dark:bg-neutral-800 dark:text-white  w-screen absolute left-0 top-36 h-fit xl:hidden"
            : "flex flex-col items-center gap-y-4 the-content py-0 text-center text-black bg-white dark:bg-neutral-800 dark:text-white w-screen absolute left-0 top-36 h-0 collapse rounded-none"
        }
      >
        {/* search bar */}
        <div className="flex md:hidden relative text-sky-900 dark:text-blue-300">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-4 h-4 absolute top-4 left-3"
          />
          <input
            type="text"
            placeholder="Search"
            className="input w-auto pl-9 placeholder-current border-current border-2 rounded-xl bg-transparent focus:border-cyan-500 focus:outline-cyan-500"
          />
        </div>
        {/* signup/in btns and wallet */}
        <div className="flex xs:hidden items-center gap-x-4">
          {user ? (
            <NavLink
              to={`/profile/${user.username}`}
              className="flex items-center gap-x-1 mr-12 hover:text-cyan-500"
            >
              <div className="rounded-full w-12 h-12 border-2 border-sky-900 overflow-hidden">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="user's profile picture"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-full h-full object-cover  object-center"
                  />
                )}
              </div>
              <span className="text-xl">{user.username}</span>
            </NavLink>
          ) : (
            <>
              <NavLink to="/signup" className="underline hover:text-cyan-500">
                Sign up
              </NavLink>
              <NavLink
                to="/signin"
                className="text-white bg-cyan-500 hover:bg-cyan-600 py-2 px-4 rounded-xl"
              >
                Sign in
              </NavLink>
            </>
          )}
          <NavLink
            to="/earnings"
            className={
              user
                ? "bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl"
                : "bg-cyan-800 hover:bg-cyan-900 p-3 rounded-xl"
            }
          >
            <img src="/images/wallet.svg" width={18} height={18} />
          </NavLink>
        </div>
        {links.map((link, index, array) => {
          if (index === array.length - 1) {
            return (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-cyan-500">
                  {link.label}
                </Link>
              </li>
            );
          }
          return (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-sky-900 bg-cyan-100 px-1 pb-0.5 rounded"
                    : "hover:text-cyan-500"
                }
              >
                {link.label}
              </NavLink>
            </li>
          );
        })}
        {/* theme icon */}
        <button onClick={toggleTheme} className="block xl:hidden">
          <FontAwesomeIcon
            icon={dark ? faSun : faMoon}
            className="w-6 h-6 hover:text-cyan-500"
          />
        </button>
      </ul>
    </nav>
  );
};
export default Navbar;
