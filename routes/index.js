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

// ========== SUBACCOUNTS ============
router.get("/subaccounts/:projectId", getAllSubaccounts);
router.post("/subaccounts/:projectId", createSubaccount);
router.put("/subaccount/:subaccountId", updateSubaccount);
router.delete("/subaccount/:projectId/:subaccountId", deleteSubaccount);

// ========== CONCEPTS ============
router.get("/concepts/:projectId", getAllConcepts);
router.post("/concepts/:projectId", createConcept);
router.put("/concepts/:conceptId", updateConcept);
router.delete("/concepts/:projectId/:conceptId", deleteConcept);

module.exports = router;
