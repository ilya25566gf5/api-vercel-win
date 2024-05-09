const express = require("express");
const router = express.Router(); //
const  CompositionFamilyController = require("../controller/CompFam.controller");

router.get("/",  CompositionFamilyController.showFamilyDetails);// метод для вывода данных
router.post("/",  CompositionFamilyController.updateFamilyMember); // метод  показа
router.put("/:id",  CompositionFamilyController.editFamily); //  метод обновления
router.put("/:id",  CompositionFamilyController.addFamilyMember); //  метод обновления


module.exports = router;
