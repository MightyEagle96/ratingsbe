import express from "express";
import {
  CreateFacilitator,
  GetFacilitators,
  GetVotes,
  RateFacilitator,
  Registration,
} from "./controller.js";

const router = express.Router();

router
  .get("/", (req, res) => {
    res.json({ message: "Hello" });
  })
  .post("/register", Registration)
  .post("/createFacilitator", CreateFacilitator)
  .get("/getFacilitators", GetFacilitators)
  .post("/rateFacilitator/:id", RateFacilitator)
  .get("/getVotes", GetVotes);

export default router;
