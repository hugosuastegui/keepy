const express = require("express");
const router = express.Router();
// Require controllers from Concepts
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

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("index");
});

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
