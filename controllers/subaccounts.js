const User = require("../models/User");
const Subaccount = require("../models/Subaccount");

exports.getAllSubaccounts = async (req, res, next) => {
  const subaccounts = await Subaccount.find({ user: req.user.id });
  res.status(200).json({ subaccounts });
};

exports.createSubaccount = async (req, res, next) => {
  const { name, account } = req.body;
  const subaccount = await Subaccount.create({
    name,
    account,
    user: req.user.id,
  });
  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: { subaccounts: subaccount },
    }
  );

  res.status(200).json({ subaccount });
};

exports.updateSubaccount = async (req, res, next) => {
  const { name, account } = req.body;
  console.log(account);
  const { subaccountId } = req.params;
  const subaccount = await Subaccount.findOne({ _id: subaccountId });
  if (typeof name !== undefined) {
    subaccount.name = name;
  }
  if (typeof account !== undefined) {
    subaccount.account = account;
  }
  subaccount.save();
  res.status(200).json({ message: "Subaccount updated sucessfully" });
};

exports.deleteSubaccount = async (req, res, next) => {
  const { subaccountId } = req.params;
  await Subaccount.findOneAndRemove({ _id: subaccountId });
  res.status(200).json({ message: "Subaccount deleted succesfully" });
};
