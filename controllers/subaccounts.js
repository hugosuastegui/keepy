const User = require("../models/User");
const Subaccount = require("../models/Subaccount");

exports.getAllSubaccounts = async (req, res, next) => {
  const userSubaccounts = await User.find({ _id: req.user.id }, "subaccounts");
  console.log(userSubaccounts);
  res.status(200).json({ userSubaccounts });
};
exports.createSubaccount = async (req, res, next) => {};
exports.updateSubaccount = async (req, res, next) => {};
exports.deleteSubaccount = async (req, res, next) => {};
