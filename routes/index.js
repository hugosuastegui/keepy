const express = require("express");
const router = express.Router();
// Require controllers from concepts
const {
  getAllConcepts,
  createConcept,
  updateConcept,
  deleteConcept,
} = require("../controllers/concepts");

// Require controllers from subacccounts
const {
  getAllSubaccounts,
  createSubaccount,
  updateSubaccount,
  deleteSubaccount,
} = require("../controllers/subaccounts");

// Require controllers from projects
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects");

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("index");
});

// ========== PROJECTS ============
router.get("/projects", getAllProjects);
router.post("/projects", createProject);
router.put("/projects/:projectId", updateProject);
router.delete("/projects/:projectId", deleteProject);

// ========== CONCEPTS ============
router.get("/concepts", getAllConcepts);
router.post("/concepts", createConcept);
router.put("/concepts/:conceptId", updateConcept);
router.delete("/concepts/:conceptId", deleteConcept);

// ========== SUBACCOUNTS ============
router.get("/subaccounts", getAllSubaccounts);
router.post("/subaccounts", createSubaccount);
router.put("/subaccount/:subaccountId", updateSubaccount);
router.delete("/subaccount/:subaccountId", deleteSubaccount);

module.exports = router;
