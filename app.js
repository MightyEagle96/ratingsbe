/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { ConnectDatabase } from "./database.js";
import router from "./router.js";

ConnectDatabase();

dotenv.config();

const originURL =
  process.env.NODE_ENV === "production"
    ? "https://seminarrating.web.app"
    : "http://localhost:3000";

const app = express();
app.use(cors({ origin: originURL, credentials: true }));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 7006;
app.use(router);
app.use("*", (req, res) => {
  res.status(404).json({
    title: "Invalid Route",
    message: "Cannot find this route on this server",
  });
});
app.listen(PORT, () => {
  console.log("App is listening");
});
