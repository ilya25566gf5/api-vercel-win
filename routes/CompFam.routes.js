const express = require("express");
const router = express.Router(); //
const  CompositionFamilyController = require("../controller/CompFam.controller");

router.get("/",  CompositionFamilyController.showFamilyDetails);
router.post("/",  CompositionFamilyController.updateFamilyMember); 
router.put("/:id",  CompositionFamilyController.editFamily); 
router.put("/:id",  CompositionFamilyController.addFamilyMember);


module.exports = router;
