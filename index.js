const express = require("express") //библиотека
const app = express() //библиотека




require('dotenv').config()

const incomeRouter = require('./routes/Income.router')
const KindsRelatendessRoutes = require ('./routes/KindsRelatedness.router')
const incomeType = require ('./routes/IncomeType.router')
const ExpensesController3 = require ('./routes/Expenses3.router')
const ExpensesController = require ('./routes/Expenses.router')
const CompositionFamilyController = require ('./routes/CompFam.routes')



app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/v1/income", incomeRouter) //путь по которому проходит апи
app.use("/api/v1/KindsRel", KindsRelatendessRoutes)
app.use("/api/v1/incomeType", incomeType)
app.use("/api/v1/ExpContr3", ExpensesController3)
app.use("/api/v1/ExpContr", ExpensesController)
app.use("/api/v1/CompFam", CompositionFamilyController)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server running....");
});
