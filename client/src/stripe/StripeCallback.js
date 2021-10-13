import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import { toast } from "react-toastify";
import { updateUserInLocalStorage } from "../actions/auth";

const StripeCallback = ({ history }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  console.log(auth.token);

  useEffect(() => {
    if (auth && auth.token) accountStatus(auth);
  }, [auth]);

  const accountStatus = async (auth) => {
    try {
      console.log("get to account status");
      let res = await getAccountStatus(auth.token);

      updateUserInLocalStorage(res.data, () => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        window.location.href = "/dashboard/seller";
      });
      console.log(
        "User account status on stripe callback----------------",
        res
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;
