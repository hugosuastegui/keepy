const User = require("../models/User");
const Project = require("../models/Project");
const Concept = require("../models/Concept");
const Subaccount = require("../models/Subaccount");

exports.getAllConcepts = async (req, res) => {
  const { projectId } = req.params;
  const concepts = await Concept.find({ project: projectId }).populate(
    "subaccount"
  );
  const accum = subtotal(concepts, "amount");
  res.status(200).json({ concepts, accum });
};

exports.createConcept = async (req, res) => {
  const {
    description,
    day,
    month,
    year,
    amount,
    subaccount,
    invoice,
  } = req.body;

  const [{ id }] = await Subaccount.find({ name: subaccount.name }, "_id");

  const concept = await Concept.create({
    description,
    day,
    month,
    year,
    amount,
    subaccount: id,
    invoice,
    project: req.params.projectId,
    user: req.user.id,
  });

  await Project.findOneAndUpdate(
    { _id: req.params.projectId },
    {
      $push: { concepts: concept },
    }
  );

  res.status(200).json({ concept });
};

exports.updateConcept = async (req, res) => {
  const { conceptId } = req.params;
  const {
    description,
    day,
    month,
    year,
    amount,
    subaccount,
    invoice,
  } = req.body;

  const [{ id }] = await Subaccount.find({ name: subaccount }, "_id");

  const concept = await Concept.findOne({ _id: conceptId });
  concept.description = description;
  concept.day = day;
  concept.month = month;
  concept.year = year;
  concept.amount = amount;
  concept.subaccount = id;
  concept.invoice = invoice;
  concept.save();

  res.status(200).json({ concept });
};

exports.deleteConcept = async (req, res) => {
  const concept = await Concept.findOneAndRemove({ _id: req.params.conceptId });
  const project = await Project.findOneAndUpdate(
    { _id: req.params.projectId },
    {
      $pull: { concepts: concept },
    }
  );
  res.status(200).json({ message: "Concept deleted sucessfully" });
};
// Brief

exports.getAllConceptsByYear = async (req, res) => {
  const { projectId } = req.params;
  const { year } = req.params;

  const rawData = await Concept.find({
    project: projectId,
    year: year.toString(),
  }).populate("subaccount");

  const data = [];
  const subaccounts = [];
  const subaccountIds = [];

  const accounts = [
    "Revenue",
    "COGS",
    "SG&A",
    "Taxes",
    "CapEX",
    "Dividends",
    "Retained Earnings",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  rawData.forEach((el) => {
    if (!subaccountIds.includes(el.subaccount._id)) {
      subaccountIds.push(el.subaccount._id);
      subaccounts.push(el.subaccount);
    }
  });

  accounts.forEach((account) => {
    let accountSubtotals = [];
    let subaccountSubtotals = [];
    let subaccountArray = [];

    months.forEach((month) => {
      let subtotal = rawData
        .filter((el) => el.subaccount.account === account && el.month === month)
        .reduce((accum, curr) => accum + curr.amount, 0);
      accountSubtotals.push(subtotal);
    });

    subaccounts.forEach((subaccount) => {
      months.forEach((month) => {
        let subtotal = rawData
          .filter(
            (el) =>
              el.subaccount.account === account &&
              el.subaccount.name === subaccount.name &&
              el.month === month
          )
          .reduce((accum, curr) => accum + curr.amount, 0);
        subaccountSubtotals.push(subtotal);
        // console.log(subaccountSubtotals);
      });

      if (subaccount.account === account) {
        subaccountArray.push({
          subaccount: subaccount.name,
          values: subaccountSubtotals,
        });
      }
      subaccountSubtotals = [];
    });

    data.push({
      name: account,
      values: accountSubtotals,
      subaccounts: subaccountArray,
    });

    subtotals = [];
  });

  res.status(200).json({ data });
};

// Functions

function subtotal(array, attr) {
  let newArray = [];
  array.forEach((curr, ind) => {
    if (ind === 0) {
      newArray.push(curr[attr]);
    } else {
      let accum = curr[attr] + newArray[ind - 1];
      newArray.push(accum);
    }
  });
  return newArray;
}
