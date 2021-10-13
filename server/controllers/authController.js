import User from "../models/user.js";
import jwt from "jsonwebtoken";

// export const showMessage = (req, res) => {
//   res.status(200).send(`Here is the message: ${req.params.message}`);
// };

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  //validation\
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 7)
    return res
      .status(400)
      .send("Password is required and must be greater than 7 characters");
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).send("Email is taken");

  //register
  const user = new User(req.body);
  try {
    await user.save();
    console.log("User CREATED");
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error, try again");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();

    if (!user) res.status(400).send("User does not exist");

    //compare password
    user.comparePassword(password, (err, match) => {
      console.log("COMPARE PASSWORD", err);

      if (!match || err) return res.status(400).send("Wrong password");

      //generate a token
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });

    //console.log("Existing User", user);
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Signin failed");
  }
};
