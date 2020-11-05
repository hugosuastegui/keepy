const User = require("../models/User");
const Concept = require("../models/Concept");

exports.getAllConcepts = async (req, res) => {
  const user = req.user.id;
  const concepts = await find(user);
  res.status(200).json({ concepts });
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
    subaccount,
    invoice,
    user: req.user.id,
  });

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
