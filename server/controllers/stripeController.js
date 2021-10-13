import User from "../models/user.js";
import Stripe from "stripe";
import queryString from "query-string";

const stripe = new Stripe(
  `sk_test_51JfpILIil9o7ze18IVGREP6545Jw8woY0MKYit5njJlqm3xd0bl588TZftq9av6Njjw8TTpMmI4CbydRJObJQtV300vFt3I5Gy`
);

export const createConnectAccount = async (req, res) => {
  //find user from database
  let user = await User.findById(req.user._id).exec();
  console.log("User==>", user);

  //if user does not have a stripe account yet create one

  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });

    console.log("Account==>", account);
    user.stripe_account_id = account.id;
    user.save();
  }
  console.log(`already created id ${user.stripe_account_id}`);

  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  console.log(`Account link`, accountLink);
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log(link);
  res.send(link);
};

const updateDelayDays = async (accountId) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });

  return account;
};

export const getAccountStatus = async (req, res) => {
  let user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);

  //console.log("User account status ==>", account);

  //update delay days
  const updatedAccount = await updateDelayDays(account.id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true }
  )
    .select("-password")
    .exec();

  // const updatedUser = await User.findByIdAndUpdate(
  //   user._id,
  //   {
  //     stripe_seller: account,
  //   },
  //   { new: true }
  // )
  //   .select("-password")
  //   .exec();

  console.log("Updated user===> ", updatedUser);

  res.json(updatedUser);
};

export const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.user._id).exec();

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });

    console.log("BALANCE ===> ", balance);
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};
