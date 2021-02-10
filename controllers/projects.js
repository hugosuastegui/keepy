const User = require("../models/User");
const Project = require("../models/Project");

exports.getAllProjects = async (req, res, next) => {
  const projects = await Project.find({ user: req.user.id });
  res.status(200).json({ projects });
};

exports.getProject = async (req, res, next) => {
  const project = await Project.findOne({ _id: req.params.projectId });
  res.status(200).json({ project });
};

exports.createProject = async (req, res, next) => {
  const user = req.user.id;
  const { name, description, category } = req.body;
  const project = await Project.create({
    name,
    description,
    category,
    user,
  });
  await User.findByIdAndUpdate({ _id: user }, { $push: { projects: project } });
  res.status(200).json({ project });
};

exports.updateProject = async (req, res, next) => {
  const { name, description, category } = req.body;
  console.log(req.params.projectId);
  const project = await Project.findOne({ _id: req.params.projectId });
  if (typeof name !== undefined) {
    project.name = name;
  }
  if (typeof description !== undefined) {
    project.description = description;
  }
  if (typeof category !== undefined) {
    project.category = category;
  }
  project.save();
  res.status(200).json({ message: "Project updated succesfully" });
};

exports.deleteProject = async (req, res, next) => {
  await Project.findByIdAndDelete({ _id: req.params.projectId });
  res.status(200).json({ message: "Project deleted succesfully" });
};
