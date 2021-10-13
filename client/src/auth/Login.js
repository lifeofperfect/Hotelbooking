import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../component/LoginForm";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });

      console.log("LOGIN RESPONSE", res);
      if (res.data) {
        console.log(
          "SAVE USER RESPONSE IN REDUX AND ALSO IN LOCAL STORAGE THEN REDIRECT ==>"
        );
        //save in local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        //save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });

        console.log(res.data);
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary h1 p-5 text-center">
        Login Page
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              password={password}
              setPassword={setPassword}
              setEmail={setEmail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
