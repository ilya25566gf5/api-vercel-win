const express = require("express");
const router = express.Router(); //
const IncomeTypesController = require("../controller/IncomeType.controller");

router.get("/", IncomeTypesController.getAll);// метод для вывода данных
router.post("/", IncomeTypesController.addIncomeType); // метод добавления
router.put("/:id", IncomeTypesController.updateIncomeType); //  метод обновления
router.delete("/:id_income_type", IncomeTypesController.deleteIncomeType); // метод  удаления

module.exports = router;