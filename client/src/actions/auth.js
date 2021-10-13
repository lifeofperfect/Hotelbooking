import { WindowsFilled } from "@ant-design/icons";
import axios from "axios";

export const register = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

//update the user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(window.localStorage.getItem("auth"));

    auth.user = user;
    window.localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};

export const currencyFormatter = (data) => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};
