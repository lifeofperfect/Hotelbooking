import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector((state) => state);
  return (
    <div>
      <h1 className="container-fluid h1 p-5 text-center">
        Welcome to the homepage {JSON.stringify(state)}
      </h1>
    </div>
  );
};

export default Home;
