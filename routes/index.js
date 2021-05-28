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
  getProject,
} = require("../controllers/projects");

// Require controllers from users
const { updateUser } = require("../controllers/users");

// Require controllers from brief
const {
  getAllConceptsByYear,
  getAllConceptYears,
} = require("../controllers/brief");

// Require from Helpers

const { getAllSubaccountsCatalogued } = require("../controllers/helpers");

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("index");
});

// ========== PROJECTS ============
router.get("/projects", getAllProjects);
router.get("/projects/:projectId", getProject);
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

// ========== BRIEF ============

router.get("/brief/:projectId/years", getAllConceptYears);
router.get("/brief/:projectId/:year", getAllConceptsByYear);

router.put("/users/:userId", updateUser);

// ========== HELPERS ============

router.get(
  "/helpers/catalogued-subaccounts/:projectId",
  getAllSubaccountsCatalogued
);

module.exports = router;
