import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripe_session: {},
  },
  { timestamps: true }
);

// before saving we need to encrypt password
userSchema.pre("save", function (next) {
  let user = this;
  //hash password only when user is created and when password is modified
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT ERROR==> ", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("COMPARE PASSWORD", err);
      return next(err, false);
    }
    console.log("MATCH PASSWORD", match);
    return next(null, match);
  });
};

export default mongoose.model("User", userSchema);
