const pool = require("../database/index");

const KindsRelatednessController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT id_species_genus, generic_name FROM Kinds_relatedness");
            const formattedRows = rows.map(row => ({
                id_species_genus: row.id_species_genus,
                generic_name: row.generic_name
            }));
            
            res.json(formattedRows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while fetching data." });
        }
    },
};

module.exports = KindsRelatednessController;
