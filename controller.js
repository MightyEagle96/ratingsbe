import VoterModel, { facilitatorModel, votesModel } from "./VoterModel.js";

export const Registration = async (req, res) => {
  if (!req.body.phoneNumber)
    return res.status(400).json({ title: "Phone number needed" });
  req.body.phoneNumber = `234${req.body.phoneNumber.slice(
    1,
    req.body.phoneNumber.length
  )}`;

  //ensure that the phone number is not duplicated
  const duplicate = await VoterModel.findOne({
    phoneNumber: req.body.phoneNumber,
  });

  if (duplicate)
    return res.status(400).json({
      title: "Phone number already exists",
      message:
        "The phone number you are trying to register already exists. Please try another number",
    });

  const voter = await VoterModel.create(req.body);

  res.status(201).json(voter);
};
export const CreateFacilitator = async (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    await facilitatorModel.create(req.body[i]);
  }

  res.send("New facilitators created");
};

export const GetFacilitators = async (req, res) => {
  const data = await facilitatorModel.find();
  res.json(data);
};

export const RateFacilitator = async (req, res) => {
  try {
    const voter = await VoterModel.findById(req.params.id);

    if (!voter) {
      return res.status(400).json({
        title: "Unregistered Voter",
        message: "You are not registered, to rate the facilitators",
      });
    }

    const facilitator = await facilitatorModel.findById(req.body.facilitator);

    if (facilitator) {
      await facilitatorModel.findByIdAndUpdate(facilitator._id, {
        votes: facilitator.votes + req.body.votes,
      });

      await votesModel.create({
        voter: voter._id,
        facilitator: facilitator._id,
        votes: req.body.votes,
      });

      const responses = await votesModel
        .find({ voter: voter._id })
        .populate({ path: "facilitator", select: ["instructor", "topic"] });

      res.json(responses);
    } else res.status(500).send("something is wrong");
  } catch (error) {
    console.log(new Error(error).message);
    res.status(500).send(new Error(error).message);
  }
};

export const GetVotes = async (req, res) => {
  const data = await votesModel
    .find({ voter: req.body.voter })
    .populate({ path: "facilitator", select: ["instructor", "topic"] });
  res.json(data);
};

export const OverallVotes = async (req, res) => {
  const data = await facilitatorModel.find();

  const sortedData = data.sort((a, b) =>
    a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0
  );
  res.json(sortedData);
};

export const PeopleThatVoted = async (req, res) => {
  const data = await votesModel.find({ facilitator: req.body.facilitator });
  res.json(data.length);
};

export const CloseRegistration = async (req, res, next) => {
  const closeTime = new Date(2022, 8, 24, 9, 0, 0);

  if (Date.now >= Date.parse(closeTime)) {
    return res.status(400).json({
      title: "Voting has ended",
      message: "The time frame for rating the facilitators has elapsed.",
    });
  } else next();
};
