const pool = require("../database/index");

const IncomeController = {
    getAll: async (req, res) => {
        try {
            // Объединяем все необходимые поля в запрос
            const query = `
                SELECT id_income, income_type, amount, date, id_family 
                FROM Income;
            `;
            
            const [rows, fields] = await pool.query(query);
            
            // Форматируем строки для отправки в ответе
            const formattedRows = rows.map(row => ({
                idIncome: row.id_income,
                incomeType: row.income_type,
                amount: row.amount,
                date: `${row.date.getFullYear()}-${String(row.date.getMonth() + 1).padStart(2, '0')}-${String(row.date.getDate()).padStart(2, '0')}`,
                idFamily: row.id_family
            }));
            
            res.json(formattedRows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while fetching data." });
        }
    },
    
    

    addIncome: async (req, res) => {
        try {
            if (!req.body.income_type ||!req.body.amount ||!req.body.date ||!req.body.id_family) {
                return res.status(400).json({ message: "Missing required fields." });
            }
            const { income_type, amount, date, id_family } = req.body;

            const formattedDate = new Date(date).toISOString().split('T')[0]; 
        
            const [result] = await pool.query(
                "INSERT INTO Income (income_type, amount, date, id_family) VALUES (?,?,?,?)",
                [income_type, amount, formattedDate, id_family]
            );
        
            if (result.affectedRows > 0) {
                res.status(201).json({ message: "Income added successfully.", id: result.insertId });
            } else {
                res.status(500).json({ message: "Failed to add income." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while adding income." });
        }
    },

    updateIncome: async (req, res) => {
        try {
            if (!req.params.id ||!req.body.income_type ||!req.body.amount ||!req.body.date ||!req.body.id_family) {
                return res.status(400).json({ message: "Missing required fields or ID." });
            }
            const { income_type, amount, date, id_family } = req.body;
            const id = req.params.id;

            const formattedDate = new Date(date).toISOString().split('T')[0]; 

            const [result] = await pool.query(
                "UPDATE Income SET income_type =?, amount =?, date =?, id_family =? WHERE id =?",
                [income_type, amount, formattedDate, id_family, id]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Income updated successfully." });
            } else {
                res.status(404).json({ message: "Income not found or failed to update." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while updating income." });
        }
    },

    deleteIncome: async (req, res) => {
        try {
            const { id_income } = req.params;
            const [result] = await pool.query("DELETE FROM Income WHERE id_income =?", [id_income]);
    
            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Income deleted successfully." });
            } else {
                res.status(404).json({ message: "Income not found or failed to delete." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while deleting income." });
        }
    }
    
    
}

module.exports = IncomeController;






// addIncome добавление новой записи
// {
//     "income_type": 1,
//     "amount": 9000.00,
//     "date": "2024-05-09",
//     "id_family": 15
// }




