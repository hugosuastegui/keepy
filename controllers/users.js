const User = require("../models/User");

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  rs;
  const { username } = req.body;
  const userToUpdate = await User.findOne({ _id: userId });
  userToUpdate.username = username;
  userToUpdate.save();
  res.status(200).json(userToUpdate);
};
