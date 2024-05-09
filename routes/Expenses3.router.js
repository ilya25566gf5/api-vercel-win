const express = require("express");
const router = express.Router(); //
const ExpensesController3 = require("../controller/Expenses3.controller");

router.get("/", ExpensesController3.getAllLastThree);// метод для вывода данных
router.post("/", ExpensesController3.addExpense); // метод добавления
router.put("/:id", ExpensesController3.updateExpense); //  метод обновления

module.exports = router;