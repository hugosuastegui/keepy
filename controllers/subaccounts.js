const Project = require("../models/Project");
const Subaccount = require("../models/Subaccount");

exports.getAllSubaccounts = async (req, res, next) => {
  const { projectId } = req.params;
  const accounts = [
    "Revenue",
    "COGS",
    "SG&A",
    "Taxes",
    "CapEX",
    "Dividends",
    "Retained Earnings",
  ];

  const revenueSubaccounts = await Subaccount.find({
    project: projectId,
    account: "Revenue",
  });
  const cogsSubaccounts = await Subaccount.find({
    project: projectId,
    account: "COGS",
  });
  const sgaSubaccounts = await Subaccount.find({
    project: projectId,
    account: "SG&A",
  });
  const taxesSubaccounts = await Subaccount.find({
    project: projectId,
    account: "Taxes",
  });
  const capexSubaccounts = await Subaccount.find({
    project: projectId,
    account: "CAPEX",
  });
  const dividendsSubaccounts = await Subaccount.find({
    project: projectId,
    account: "Dividends",
  });
  const retainedEarningsSubaccounts = await Subaccount.find({
    project: projectId,
    account: "Retained Earnings",
  });

  // console.log(revenueSubaccounts);
  // console.log(cogsSubaccounts);
  // console.log(sgaSubaccounts);
  // console.log(taxesSubaccounts);
  // console.log(capexSubaccounts);
  // console.log(dividendsSubaccounts);
  console.log(revenueSubaccounts);

  const options = [
    {
      label: "Colours",
      options: [
        { value: "blue", label: "Blue", color: "#0052CC" },
        { value: "yellow", label: "Yellow", color: "#FFC400" },
      ],
    },
    {
      label: "Flavours",
      options: [
        { value: "vanilla", label: "Vanilla", rating: "safe" },
        { value: "chocolate", label: "Chocolate", rating: "good" },
      ],
    },
  ];

  res.status(200).json({ revenueSubaccounts });
};

exports.createSubaccount = async (req, res, next) => {
  const { projectId } = req.params;
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
