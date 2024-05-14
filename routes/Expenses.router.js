const express = require("express");
const router = express.Router(); //
const ExpensesController = require("../controller/Expenses.controller");

router.get("/", ExpensesController.getAll);// метод для вывода данных
router.post("/", ExpensesController.addExpens); // метод добавления
router.put("/", ExpensesController.updateExpens); //  метод обновления
router.delete("/:id_income", ExpensesController.deleteExpens); // метод  удаления

module.exports = router;

 
