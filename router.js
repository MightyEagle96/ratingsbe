import express from "express";
import {
  CreateFacilitator,
  GetFacilitators,
  GetVotes,
  OverallVotes,
  PeopleThatVoted,
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
  .get("/overallVotes", OverallVotes)
  .post("/peopleThatVoted", PeopleThatVoted);

export default router;
