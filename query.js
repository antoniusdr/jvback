const { user, submission, userVote } = require("./models");

async function getUserWithSubmission(userId, contestId) {
  const votesByUser = await userVote.findAll({
    where: { userId: userId, contestId: contestId },
  });
  return votesByUser.map((data) => data.get({ plain: true }));
}

getUserWithSubmission(1, 1).then((data) => console.log(data));
