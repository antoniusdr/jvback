const { Router } = require("express");
// const auth = require ("../auth/middleware")
const Submissions = require("../models").submission;

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

module.exports = router;
