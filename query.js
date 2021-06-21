const { user, submission } = require("./models");

async function getUserWithSubmission(id) {
  const userVote = await user.findByPk(id, {
    include: { model: submission, as: "voting" },
  });
  //   console.log(userVote[0].user);
  //   const mappedUser = userVote.map((userVotes) =>
  //     userVotes.get({ plain: true })
  //   );
  //   console.log(mappedUser[0].voting[0]);
  console.log(userVote);
  return userVote.get({ plain: true });
}

getUserWithSubmission(1).then((data) => console.log(data));
