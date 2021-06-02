const Kpi = require("../models/Kpi");
const Project = require("../models/Project");
const Subaccount = require("../models/Subaccount");

exports.getAllKpis = async (req, res) => {
  const { projectId } = req.params;
  const kpis = await Kpi.find({ project: projectId })
    .populate("metric1")
    .populate("metric2");
  res.status(200).json({ kpis });
};

exports.createKpi = async (req, res) => {
  const { projectId } = req.params;
  const { name, description, metric1, metric2, operation } = req.body;

  const subaccount1Id = await Subaccount.findOne({ name: metric1 }, "_id");
  const subaccount2Id = await Subaccount.findOne({ name: metric2 }, "_id");

  console.log(subaccount1Id);
  console.log(subaccount2Id);

  const kpi = await Kpi.create({
    name,
    description,
    operation,
    metric1: subaccount1Id,
    metric2: subaccount2Id,
    project: projectId,
  }).catch((err) => {
    err.message;
  });

  await Project.findOneAndUpdate(
    { _id: projectId },
    {
      $push: { kpis: kpi },
    }
  );

  res.status(200).json({ kpi });
};

exports.updateKpi = async (req, res) => {
  const { kpiId } = req.params;
  const { name, description, metric1, metric2, operation } = req.body;

  const kpi = await Kpi.findOne({ _id: kpiId });
  kpi.name = name;
  kpi.description = description;
  kpi.metric1 = metric1;
  kpi.metric2 = metric2;
  kpi.operation = operation;

  kpi.save();

  console.log(kpi);
  // res.status(200).json({ kpi });
};

exports.deleteKpi = async (req, res) => {
  const { kpiId, projectId } = req.params;
  const kpi = await Kpi.findOneAndRemove({ _id: kpiId });
  await Project.findOneAndUpdate(
    { _id: projectId },
    {
      $pull: { kpis: kpi },
    }
  );
  console.log("Kpi deleted successfully");
  // res.status(200).json({ message: "Kpi deleted sucessfully" });
};
