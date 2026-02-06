import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchInput, setsearchInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchInput.trim() !== "") {
        navigate(`/results?search_query=${searchInput}`);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white px-4 py-2 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        {/* Menu Button → Home */}
        {/* <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full hover:bg-gray-100 mr-2"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              fill="currentColor"
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            ></path>
          </svg>
        </button> */}

        {/* Logo → Home */}
        <button onClick={() => navigate("/")} className="flex items-center">
          <svg viewBox="0 0 90 20" className="w-24 h-8 text-red-600">
            <path
              fill="currentColor"
              d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
            />
            <path
              fill="white"
              d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
            />
          </svg>

          <span className="text-xl font-bold ml-1 hidden md:block">
            PlayZone
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8">
        <div className="flex w-full">
          <input
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
          />
          <Link
            to={`/results?search_query=${searchInput}`}
            className="bg-gray-100 px-6 py-2 border border-gray-300 border-l-0 rounded-r-full hover:bg-gray-200"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"
              ></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        {/* Upload Button */}
        <button
          onClick={() => navigate("/upload")}
          className="p-2 rounded-full hover:bg-gray-100 hidden md:block"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              fill="currentColor"
              d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"
            ></path>
          </svg>
        </button>

        {/* Notification Button */}
        <button
          onClick={() => navigate("/library")}
          className="p-2 rounded-full hover:bg-gray-100 hidden md:block"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              fill="currentColor"
              d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76 1.51.74 2.01 2.26 1.01 3.51-.66.81-1.13 1.76-1.13 2.79v.11c2.44.75 4 3.06 4 5.98v5.15l2 1.87z"
            ></path>
          </svg>
        </button>

        {/* Profile → Auth */}
        <button
          onClick={() =>
            navigate(`/channel/${JSON.parse(localStorage.getItem("user")).id}`)
          }
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-medium"
        >
          U
        </button>
      </div>
    </nav>
  );
};

export default Header;
