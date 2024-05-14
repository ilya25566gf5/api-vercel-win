const pool = require("../database/index");

const ExpensesController = {
    getAll: async (req, res) => {
        try {
            // Измененный запрос для выбора всех полей
            const [rows, fields] = await pool.query("SELECT * FROM Expenses");
            
            // Форматирование результатов
            const formattedRows = rows.map(row => ({
                id_expenditure: row.id_expenditure,
                id_family: row.id_family,
                id_category: row.id_category,
                description: row.description,
                amount: row.amount,
                date: `${new Date(row.date).toISOString().split('T')[0]}`
            }));

            res.json(formattedRows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while fetching data." });
        }
    },

    addExpens: async (req, res) => {
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

    updateExpens: async (req, res) => {
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
    },

    deleteExpens: async (req, res) => {
        try {
            const { id_expenditure } = req.params;
            const [result] = await pool.query("DELETE FROM Expenses WHERE id_expenditure =?", [id_expenditure]);

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Expense deleted successfully." });
            } else {
                res.status(404).json({ message: "Expense not found or failed to delete." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while deleting expense." });
        }
    }
}

module.exports = ExpensesController;

