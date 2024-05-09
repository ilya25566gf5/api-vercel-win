const express = require("express");
const router = express.Router();
const IncomeController = require("../controller/Income.controller");

router.get("/", IncomeController.getAll);// метод для вывода данных
router.post("/", IncomeController.addIncome); // метод добавления
router.put("/:id", IncomeController.updateIncome); //  метод обновления
router.delete("/:id_income", IncomeController.deleteIncome); // метод  удаления

module.exports = router;
