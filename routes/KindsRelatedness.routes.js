const express = require("express");
const router = express.Router();
const KindsRelatendessController = require("../controller/KindsRelatendess.controller");

router.get("/",KindsRelatendessController .getAll);// метод для вывода данных


module.exports = router;