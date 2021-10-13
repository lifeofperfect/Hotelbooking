import express from "express";
import router from "./routes/auth.js";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import stripe from "./routes/stripe.js";

import morgan from "morgan";

const app = express();

dotenv.config();

//db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Db connection error: ", err));

const port = process.env.PORT || 8000;

// fs.readdirSync("./routes").map((r) =>
//   app.use("/api", require(`./routes/${r}`))
// );
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);
app.use("/api", stripe)

app.get("*", (req, res) => res.status(404).send({ err: "request not found" }));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
