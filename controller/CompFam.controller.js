const pool = require("../database/index");

const CompositionFamilyController = {
    updateFamilyMember: async (req, res) => {
        try {
            if (!req.params.id ||!req.body.phone_number ||!req.body.first_name ||!req.body.last_name ||!req.body.password ||!req.body.code_species_relatedness) {
                return res.status(400).json({ message: "Missing required fields or ID." });
            }
            const { phone_number, first_name, last_name, password, code_species_relatedness } = req.body;
            const id = req.params.id;

            const [result] = await pool.query(
                "UPDATE Composition_Family SET phone_number =?, first_name =?, last_name =?, password =?, code_species_relatedness =? WHERE id_family =?",
                [phone_number, first_name, last_name, password, code_species_relatedness, id]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Family member updated successfully." });
            } else {
                res.status(404).json({ message: "Family member not found or failed to update." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while updating family member." });
        }
    },
    // Метод для редактирования записей в Composition_Family
    editFamily: async (req, res) => {
        try {
            if (!req.params.id ||!req.body.phone_number ||!req.body.first_name ||!req.body.last_name ||!req.body.password ||!req.body.code_species_relatedness) {
                return res.status(400).json({ message: "Missing required fields or ID." });
            }
            const { phone_number, first_name, last_name, password, code_species_relatedness } = req.body;
            const id = req.params.id;

            const [result] = await pool.query(
                "UPDATE Composition_Family SET phone_number =?, first_name =?, last_name =?, password =?, code_species_relatedness =? WHERE id_family =?",
                [phone_number, first_name, last_name, password, code_species_relatedness, id]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Family composition updated successfully." });
            } else {
                res.status(404).json({ message: "Family composition not found or failed to update." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while updating family composition." });
        }
    },

    // Метод для показа определенных полей из Composition_Family
    showFamilyDetails: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT id_family, phone_number, first_name, last_name FROM Composition_Family");
            const formattedRows = rows.map(row => ({
                id_family: row.id_family,
                phone_number: row.phone_number,
                first_name: row.first_name,
                last_name: row.last_name
            }));

            res.json(formattedRows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while fetching family details." });
        }
    },
addFamilyMember: async (req, res) => {
    try {
        if (!req.body.phone_number ||req.body.first_name ||req.body.last_name ||req.body.password ||req.body.code_species_relatedness) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        const { phone_number, first_name, last_name, password, code_species_relatedness } = req.body;

        const [result] = await pool.query(
            "INSERT INTO Composition_Family (phone_number, first_name, last_name, password, code_species_relatedness) VALUES (?,?,?,?,?)",
            [phone_number, first_name, last_name, password, code_species_relatedness]
        );

        if (result.affectedRows > 0) {
            res.status(201).json({ message: "Family member added successfully.", id: result.insertId });
        } else {
            res.status(500).json({ message: "Failed to add family member." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while adding family member." });
    }
}

}

module.exports = CompositionFamilyController;