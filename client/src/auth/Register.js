import React, { useState } from "react";
import { RegisterForm } from "../component/RegisterForm";
import axios from "axios";
import { toast } from "react-toastify";
import { register } from "../actions/auth";

const Register = ({ history }) => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post(`${process.env.REACT_APP_API}/register`, {
      //   name,
      //   email,
      //   password,
      // });
      const res = await register({
        name,
        email,
        password,
      });
      console.log("Registered user==> ", res);
      toast.success("Register success. please login");
      history.push("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              email={email}
              password={password}
              setName={setName}
              setPassword={setPassword}
              setEmail={setEmail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
