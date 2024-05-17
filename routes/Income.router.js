const express = require("express");
const router = express.Router();
const IncomeController = require("../controller/Income.controller");

// Метод для вывода данных
router.get("/", IncomeController.getAll);

// Метод добавления
router.post("/", IncomeController.addIncome);

// Метод обновления
router.put("/:id", IncomeController.updateIncome);

// Метод удаления - обновленный, использующий параметр :id вместо :id_income
router.delete("/:id", IncomeController.deleteIncome);

module.exports = router;

