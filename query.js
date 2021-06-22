const { user, submission, userVote } = require("./models");

async function getUserWithSubmission(userId) {
  const votesByUser = await userVote.findAll({ where: { userId: userId } });
  return votesByUser.map((data) => data.get({ plain: true }));
}

getUserWithSubmission(1).then((data) => console.log(data));
