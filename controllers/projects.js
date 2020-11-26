const User = require("../models/User");
const Concept = require("../models/Concept");
const Subaccount = require("../models/Subaccount");
const Project = require("../models/Project");

exports.getAllProjects = async (res, req, next) => {
  const user = req.user.id;
  const projects = await Project.find({ user });
  res.status(200).json({ projects });
};

exports.createProject = async (res, req, next) => {
  const user = req.user.id;
  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    user,
  });
  await User.findByIdAndUpdate({ _id: user }, { $push: { projects: project } });
  res.status(200).json({ project });
};

exports.updateProject = async (res, req, next) => {
  const { name, description } = req.body;
  const project = await Project.findOne({ _id: req.params.proejctid });
  if (typeof name !== undefined) {
    project.name = name;
  }
  if (typeof description !== undefined) {
    project.description = description;
  }
  project.save();
  res.status(200).json({ message: "Project updated succesfully" });
};

exports.deleteProject = async (res, req, next) => {
  await Project.findByIdAndDelete(req.params.proejctId);
};
