const pool = require("../database/index");

const IncomeTypesController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM Income_Types");
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while fetching data." });
        }
    },

    addIncomeType: async (req, res) => {
        try {
            if (!req.body.income_type_name) {
                return res.status(400).json({ message: "Missing required field." });
            }
            const { income_type_name } = req.body;

            const [result] = await pool.query(
                "INSERT INTO Income_Types (income_type_name) VALUES (?)",
                [income_type_name]
            );

            if (result.affectedRows > 0) {
                res.status(201).json({ message: "Income type added successfully.", id: result.insertId });
            } else {
                res.status(500).json({ message: "Failed to add income type." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while adding income type." });
        }
    },

    updateIncomeType: async (req, res) => {
        try {
            if (!req.params.id ||!req.body.income_type_name) {
                return res.status(400).json({ message: "Missing required fields or ID." });
            }
            const { income_type_name } = req.body;
            const id = req.params.id;

            const [result] = await pool.query(
                "UPDATE Income_Types SET income_type_name =? WHERE id_income_types =?",
                [income_type_name, id]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Income type updated successfully." });
            } else {
                res.status(404).json({ message: "Income type not found or failed to update." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while updating income type." });
        }
    },

    deleteIncomeType: async (req, res) => {
        try {
            const { id_income_types } = req.params;
            const [result] = await pool.query("DELETE FROM Income_Types WHERE id_income_types =?", [id_income_types]);

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Income type deleted successfully." });
            } else {
                res.status(404).json({ message: "Income type not found or failed to delete." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while deleting income type." });
        }
    }
}

module.exports = IncomeTypesController;
