const pool = require("../database/index");

const ExpensesController3 = {
    getAllLastThree: async (req, res) => {
        try {
            // Измененный запрос для выбора только нужных столбцов
            const [rows, fields] = await pool.query("SELECT description, amount, date FROM Expenses ORDER BY date DESC LIMIT 3");
            const formattedRows = rows.map(row => ({
                description: row.description,
                amount: row.amount,
                date: `${row.date.getFullYear()}-${String(row.date.getMonth() + 1).padStart(2, '0')}-${String(row.date.getDate()).padStart(2, '0')}`
            }));
    
            res.json(formattedRows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while fetching data." });
        }
    },
    

    addExpense: async (req, res) => {
        try {
            if (!req.body.id_family ||!req.body.id_category ||!req.body.description ||!req.body.amount ||!req.body.date) {
                return res.status(400).json({ message: "Missing required fields." });
            }
            const { id_family, id_category, description, amount, date } = req.body;

            const formattedDate = new Date(date).toISOString().split('T')[0];

            const [result] = await pool.query(
                "INSERT INTO Expenses (id_family, id_category, description, amount, date) VALUES (?,?,?,?,?)",
                [id_family, id_category, description, amount, formattedDate]
            );

            if (result.affectedRows > 0) {
                res.status(201).json({ message: "Expense added successfully.", id: result.insertId });
            } else {
                res.status(500).json({ message: "Failed to add expense." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while adding expense." });
        }
    },

    updateExpense: async (req, res) => {
        try {
            if (!req.params.id ||!req.body.id_family ||!req.body.id_category ||!req.body.description ||!req.body.amount ||!req.body.date) {
                return res.status(400).json({ message: "Missing required fields or ID." });
            }
            const { id_family, id_category, description, amount, date } = req.body;
            const id = req.params.id;

            const formattedDate = new Date(date).toISOString().split('T')[0];

            const [result] = await pool.query(
                "UPDATE Expenses SET id_family =?, id_category =?, description =?, amount =?, date =? WHERE id_expenditure =?",
                [id_family, id_category, description, amount, formattedDate, id]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Expense updated successfully." });
            } else {
                res.status(404).json({ message: "Expense not found or failed to update." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while updating expense." });
        }
    }
}

module.exports = ExpensesController3;