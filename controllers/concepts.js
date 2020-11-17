const User = require("../models/User");
const Concept = require("../models/Concept");
const Subaccount = require("../models/Subaccount");

exports.getAllConcepts = async (req, res) => {
  const user = req.user.id;
  const concepts = await Concept.find({ user });
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

  const concept = await Concept.create({
    description,
    day,
    month,
    year,
    amount,
    invoice,
    user: req.user.id,
  });

  const subaccountId = await Subaccount.find({ name: subaccount }, "_id");

  if (subaccountId) {
    concept.subaccount = subaccountId;
  }

  await User.findOneAndUpdate(
    { _id: req.user._id },
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

  const concept = await Concept.findOne({ _id: conceptId });
  concept.description = description;
  concept.day = day;
  concept.month = month;
  concept.year = year;
  concept.amount = amount;
  concept.subaccount = subaccount;
  concept.invoice = invoice;
  concept.save();

  res.status(200).json({ concept });
};

exports.deleteConcept = async (req, res) => {
  await Concept.findByIdAndDelete({ _id: req.params.conceptId });
  res.status(200).json({ message: "Concept deleted sucessfully" });
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
