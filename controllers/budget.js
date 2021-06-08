const Budget = require("../models/Concept");
const Project = require("../models/Project");
const Subaccount = require("../models/Subaccount");

exports.getBudgetByYearByMonth = async (req, res) => {
  const { projectId, year, month } = req.params;
  const budgets = await Budget.find({ project: projectId, year, month });
  res.status(200).json({ budgets });
};

exports.createBudget = async (req, res) => {
  const { projectId } = req.params;
  const { subaccountId, year, month, amount } = req.body;

  // Verificar si ya hay un presupuesto para ese mes en ese año para esa subcuenta
  const existingBudget = await Budget.find({
    project: projectId,
    year,
    month,
  }).catch((err) => err.message);

  if (existingBudget.length === 0) {
    const budget = await Budget.create({
      subaccount: subaccountId,
      amount,
      year,
      month,
      project: projectId,
    }).catch((err) => err.message);

    await Project.findOneAndUpdate(
      { _id: projectId },
      {
        $push: { budgets: budget },
      }
    );

    await Subaccount.findOneAndUpdate(
      { _id: subaccountId },
      {
        $push: { budgets: budget },
      }
    );
    res.status(200).json({
      budget,
    });
  } else {
    res.status(200).json({
      message:
        "Cant create a different budget for this subaccount for this period of time",
    });
  }
};

exports.updateBudget = async (req, res) => {
  const { budgetId } = req.params;
  const { subaccount, year, month, amount } = req.body;
  if (typeof subaccount !== undefined) {
    project.name = subaccount;
  }
  if (typeof year !== undefined) {
    project.year = year;
  }
  if (typeof month !== undefined) {
    project.month = month;
  }
  if (typeof amount !== undefined) {
    project.amount = amount;
  }
  budget.save();
  res.status(200).json({ message: "Budget updated successfully" });
};
