import express from "express";
import {
  CreateFacilitator,
  GetFacilitators,
  GetVotes,
  OverallVotes,
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
  .post("/getVotes", GetVotes)
  .get("/overallVotes", OverallVotes);

export default router;
