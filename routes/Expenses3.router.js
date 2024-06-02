const express = require("express");
const router = express.Router(); //

const AnalisController = require('../controller/Expenses3.controller'); // Убедитесь, что путь верный

router.get('/', AnalisController.getExpensesSummary); // Используйте правильное имя контроллера

module.exports = router;


