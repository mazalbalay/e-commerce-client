import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiBrightnessDown } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { ImLocation, ImUser, ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import { IoIosClose, IoIosCart } from "react-icons/io";
import $ from "jquery";

const MainNav = () => {
  const user = JSON.parse(localStorage.getItem("user"))?.data;
  const state = useSelector((state) => state.CartReducer);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function navigateTo(route) {
    navigate(`${route}`);
  }

  return (
    <nav className="shadow-md w-full top-0 left-0 bg-white ">
      <div className="  container mx-auto flex items-center  justify-between py-4 md:px-40 px-7 ">
        <div className="flex justify-center items-center text-pink-300 font-bold">
          <div className=" text-4xl mr-10 cursor-pointer flex items-center font-[poppins text-grey-600]">
            <span className="md:flex md:items-center">
              <CiBrightnessDown />
            </span>
            LOGO
          </div>
          <div
            onClick={() => {
              navigate("/checkout");
            }}
            className="flex items-center md:my-0 text-l"
          >
            <Link to="/cart">
              <span className="flex items-center text-2xl px-1 text-gray-400">
                <IoIosCart />
                {state.length}
              </span>
            </Link>
          </div>{" "}
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl flex right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </div>

        <ul
          className={`md:flex z-10 md:items-center md:pb-0 pb-12 absolute md:static md:z-auto text-xl text-gray-400 font-medium bg-white left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-700 ease-in
           ${open ? "top-20" : "top-[-490px]"}`}
        >
          <li className="md:ml-8 md:my-0 my-7 bg-white text-l hover:underline">
            <Link to="/contact-us">Contact</Link>
          </li>
          <li className="md:ml-8 md:my-0 bg-white my-7 text-l hover:underline">
            <Link to="/"> Home</Link>
          </li>

          <li className="flex bg-white items-center md:ml-5 md:my-0 my-7 text-l">
            Hello_
            <span className="">{user ? user?.name : "Guest"} </span>
          </li>

          {user ? (
            <li className="flex bg-white items-center md:ml-2 md:my-0 my-7 text-l">
              <span className="px-1 text-xl">
                <div
                  onClick={() => {
                    if ($(window).width() < 500) navigate("/userprofile/");
                    else navigate("/userProfile/userprofile/profile-info");
                  }}
                  className="w-[50px]  h-[50px] flex justify-center items-center border-pink-300 border-2 rounded-full  bg-white"
                >
                  {user?.profileImg ? (
                    <img
                      className="cursor-pointer"
                      src={user.profileImg}
                      alt=""
                    />
                  ) : (
                    <div className="text-2xl cursor-pointer text-pink-300">
                      {user?.email[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
              </span>
            </li>
          ) : (
            <li className="md:ml-8 md:my-0 my-7 bg-white text-l hover:underline">
              <Link to="/Auth">User Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
