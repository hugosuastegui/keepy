const User = require("../models/User");

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username } = req.body;
  const user = await User.findOne({ _id: userId });
  user.username = username;
  user.save();
  res.status(200).json(user);
};
