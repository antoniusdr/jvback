const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models/").user;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.get("/all", async (req, res) => {
  try {
    const limit = req.query.limit || 20;
    const offset = 0;
    const allUsers = await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send({ message: "OK", allUsers });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.patch(`/user/:id`, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      discordName,
      editBattleContestant,
      instagramHandle,
      twitchHandle,
      emailOptIn,
      isAdmin,
    } = req.body;
    const updateProfile = await User.findByPk(req.params.id);
    await updateProfile.update({
      firstName,
      lastName,
      email,
      discordName,
      editBattleContestant,
      instagramHandle,
      twitchHandle,
      emailOptIn,
      isAdmin,
    });
    return res.status(200).send({ message: "profile updated" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/user/:id/delete", async (req, res) => {
  const deleteProfile = await User.findOne({
    where: { id: req.params.id },
  }).catch((e) => {
    console.log(e.message);
  });
  if (!deleteProfile) {
    console.log(error);
  }
  deleteProfile.destroy();
});

router.post("/signup", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    discordName,
    editBattleContestant,
    isAdmin,
  } = req.body;
  if (!email || !password || !firstName) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      firstName,
      lastName,
      discordName,
      editBattleContestant,
      isAdmin,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
