const Project = require("../models/Project");
const Subaccount = require("../models/Subaccount");

exports.getAllSubaccounts = async (req, res, next) => {
  const { projectId } = req.params;
  console.log(projectId);
  const subaccounts = await Subaccount.find({ project: projectId });
  res.status(200).json({ subaccounts });
};

exports.createSubaccount = async (req, res, next) => {
  const { projectId } = req.params;
  console.log(projectId);
  const { name, account } = req.body;
  const subaccount = await Subaccount.create({
    name,
    account,
    project: projectId,
  });
  const project = await Project.findOneAndUpdate(
    { _id: projectId },
    {
      $push: { subaccounts: subaccount },
    }
  );

  console.log(project);

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
    subaccount.account = account;
  }
  subaccount.save();
  res.status(200).json({ message: "Subaccount updated sucessfully" });
};

exports.deleteSubaccount = async (req, res, next) => {
  const { subaccountId } = req.params;
  const subaccount = await Subaccount.findOneAndRemove({ _id: subaccountId });
  await Project.findOneAndUpdate(
    { _id: req.params.projectId },
    {
      $pull: { subaccounts: subaccount },
    }
  );
  res.status(200).json({ message: "Subaccount deleted succesfully" });
};
