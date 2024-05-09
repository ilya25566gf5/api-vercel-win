const express = require("express") //библиотека
const app = express() //библиотека

require('dotenv').config()

const incomeRouter = require('./routes/Income.router')
const KindsRelatendessRoutes = require ('./routes/KindsRelatedness.routes')


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/v1/income", incomeRouter) //путь по которому проходит апи
app.use("/api/v1/KindsRel", KindsRelatendessRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server running....");
});
