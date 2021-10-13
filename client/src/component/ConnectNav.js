import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import { getAccountBalance, payoutSetting } from "../actions/stripe";
import { currencyFormatter } from "../actions/auth";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      //console.log(res);
      setBalance(res.data);
    });
  });

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(token);
      console.log("RES FOR PAYOUT SETTINGS LINK", res);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Unnable to access settings try again");
    }
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>

      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Available" color="grey">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((ba, i) => (
                    <span className="lead" key={i}>
                      {currencyFormatter(ba)}
                    </span>
                  ))}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="silver">
              <Card
                onClick={handlePayoutSettings}
                classsName="bg-light pointer"
              >
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
