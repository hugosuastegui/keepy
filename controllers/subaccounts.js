const User = require("../models/User");
const Subaccount = require("../models/Subaccount");

exports.getAllSubaccounts = async (req, res, next) => {
  const userSubaccounts = await User.find({ _id: req.user.id }, "subaccounts");
  console.log(userSubaccounts);
  res.status(200).json({ userSubaccounts });
};

exports.createSubaccount = async (req, res, next) => {
  const { name, account } = req.body;
  const subaccount = await Subaccount.create({
    name,
    account,
    user: req.user.id,
  });
  res.status(200).json({ subaccount });
};

exports.updateSubaccount = async (req, res, next) => {
  const { name, account } = req.body;
  const { subaccountId } = req.params;
  const subaccount = await Subaccount.findOne({ _id: subaccountId });
  if (typeof name !== undefined) {
    subaccount.name = name;
  }
  if (typeof account !== undefined) {
    subaccountId.account = account;
  }
  subaccount.save();
  res.status(200).json({ message: "Subaccount updated sucessfully" });
};

exports.deleteSubaccount = async (req, res, next) => {
  const { subaccountId } = req.params;
  await Subaccount.findOneAndRemove({ _id: subaccountId });
  res.status(200).json({ message: "Subaccount deleted succesfully" });
};
