import React from "react";
import { useSelector } from "react-redux";

const NewHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  return <div className="container-fluid h1 p-5 text-center">New Page</div>;
};

export default NewHotel;
