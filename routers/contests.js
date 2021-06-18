const { Router } = require("express");
// const auth = require ("../auth/middleware")
const Contests = require("../models").contest;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const contests = await Contests.findAndCountAll();
    res.status(200).send({ message: "ok", contests });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "somethin went wrong lol sorry" });
  }
});

module.exports = router;
