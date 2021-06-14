const Budget = require("../models/Budget");
const Project = require("../models/Project");
const Subaccount = require("../models/Subaccount");

exports.createBudget = async (req, res) => {
  const { projectId } = req.params;
  const { subaccountName, year, month, amount } = req.body;
  const subaccount = await Subaccount.findOne({ name: subaccountName }).catch(
    (err) => console.log(err.message)
  );

  // Verificar si ya hay un presupuesto para ese mes en ese año para esa subcuenta
  const existingBudget = await Budget.find({
    project: projectId,
    year,
    month,
  }).catch((err) => err.message);

  if (existingBudget.length === 0) {
    console.log(subaccount);
    const budget = await Budget.create({
      subaccount: subaccount._id,
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
      { _id: subaccount._Id },
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
        "Cant create another budget for this subaccount for this period of time",
    });
  }
};

exports.getBudgetByYear = async (req, res) => {
  const { projectId, year } = req.params;
  const budgets = await Budget.find({ project: projectId, year }).populate(
    "subaccount"
  );

  const months = [];
  budgets.forEach((el) => {
    if (!months.includes(el.month)) months.push(el.month);
  });

  const rawdata = months.map((month) => {
    return {
      month: month,
      subaccounts: budgets.map((budget) => {
        console.log(budget);
        if (budget.month === month) {
          return { name: budget.subaccount.name, amount: budget.amount };
        }
      }),
    };
  });

  res.status(200).json({ rawdata });
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

exports.deleteBudgetsByMonthByYear = async (req, res) => {
  const { projectId, subaccountId, year, month } = req.params;
  const budgets = await Budget.find({ year, month });

  await Project.findOneAndUpdate(
    { _id: projectId },
    {
      $pull: { budgets },
    }
  );

  await Subaccount.findOneAndUpdate(
    { _id: subaccountId },
    {
      $pull: { budgets },
    }
  );

  await Budget.deleteMany({ year, month });

  res.status(200).json({ message: "Deleted projects" });
};
