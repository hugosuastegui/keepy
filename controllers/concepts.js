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
    mon,
    year,
    amount,
    subaccount,
    invoice,
    user: req.user.id,
  });
  res.status(200).json({ concept });
};
exports.updateConcept = async (req, res) => {};
