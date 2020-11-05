const express = require("express");
const router = express.Router();
// const {} = require("./controllers");

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("index");
});

// ========== CONCEPTS ============
router.get("/concepts", getAllConcepts);
router.post("/concepts", createConcept);
router.put("/concepts/:conceptId", updateConcept);

// ========== SUBACCOUNTS ============
router.get("/subaccounts", getAllSubaccounts);
router.post("/subaccounts", createSubaccount);
router.put("/subaccount/:subaccountId", updateSubaccount);
router.delete("/subaccount/:subaccountId", deleteSubaccount);

module.exports = router;
