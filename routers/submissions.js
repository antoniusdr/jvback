const { Router } = require("express");
const auth = require("../auth/middleware");
const Submissions = require("../models").submission;
const User = require("../models").user;
const userVote = require("../models").userVote;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const limit = req.query.limit || 20;
    const offset = 0;
    const submissions = await Submissions.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send({ message: "ok", submissions });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "somethin went wrong lol sorry" });
  }
});

router.post("/vote", auth, async (req, res) => {
  try {
    const { userId, submissionId, contestId } = req.body;
    const votesByUser = await userVote.findAll({
      where: { userId: userId, contestId: contestId },
    });
    if (votesByUser.length >= 5) {
      return res
        .status(403)
        .send({ message: "You already voted 5 times in this contest!" });
    } else {
      const newVote = await userVote.create({
        userId,
        submissionId,
        contestId,
      });
      return res.status(201).send({ message: "New vote posted", newVote });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(req.params.id);

    if (user === null) {
      return res.status(404).send({ message: "This user does not exist" });
    }

    if (!userId === req.user.id) {
      return res.status(403).send({ message: "Not authorized to create" });
    }
    const { contestId, songDescription, soundcloudUrl, nickname } = req.body;
    const submission = await Submissions.create({
      userId,
      contestId,
      songDescription,
      soundcloudUrl,
      nickname,
    });
    return res.status(201).send({ message: "Submission created", submission });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "somethin went wrong in the backend reach out to a mod sorry...",
    });
  }
});

module.exports = router;
