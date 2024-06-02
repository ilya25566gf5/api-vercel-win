const pool = require("../database/index");

const AnalisController = {
    getExpensesSummary: async (req, res) => {
        try {
            // Запрос для суммы всех расходов за последний месяц
            const queryLastMonthExpenses = `
            SELECT SUM(amount) AS last_month_total, 
                   MAX(amount) AS max_last_month_expense, 
                   DATE_SUB(NOW(), INTERVAL 1 MONTH) AS last_month_date
            FROM Expenses
            WHERE MONTH(date) = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH))
                 AND YEAR(date) = YEAR(DATE_SUB(NOW(), INTERVAL 1 MONTH));
            `;

            // Запрос для описания максимального расхода за последний месяц
            const queryMaxExpenseDescription = `
            SELECT description
            FROM Expenses
            WHERE amount = (
                SELECT MAX(amount)
                FROM Expenses
                WHERE MONTH(date) = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH))
                     AND YEAR(date) = YEAR(DATE_SUB(NOW(), INTERVAL 1 MONTH))
            );
            `;

            // Запрос для суммы всех доходов за последний месяц
            const queryLastMonthIncomes = `
            SELECT SUM(amount) AS last_month_income_total
            FROM Income
            WHERE MONTH(date) = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH))
                  AND YEAR(date) = YEAR(DATE_SUB(NOW(), INTERVAL 1 MONTH));
            `;

            // Выполнение запросов
            const [rowsLastMonthExpenses, fieldsLastMonthExpenses] = await pool.query(queryLastMonthExpenses);
            const [rowsMaxExpenseDescription, fieldsMaxExpenseDescription] = await pool.query(queryMaxExpenseDescription);
            const [rowsLastMonthIncomes, fieldsLastMonthIncomes] = await pool.query(queryLastMonthIncomes);

            // Обработка результатов
            const maxExpenseRow = rowsLastMonthExpenses[0];
            const maxDescription = rowsMaxExpenseDescription[0]?.description || 'N/A';
            let lastMonthIncomeTotal = 0; // Инициализируем значение по умолчанию
            if (rowsLastMonthIncomes[0]) { // Проверяем, есть ли результат от запроса к доходам
                lastMonthIncomeTotal = Number(rowsLastMonthIncomes[0].last_month_income_total); // Приводим к числу
            }

            // Вычисляется разница между доходами и расходами
            let difference = lastMonthIncomeTotal - (maxExpenseRow.last_month_total || 0);

            if (rowsLastMonthExpenses.length > 0 && rowsMaxExpenseDescription.length > 0) {
                const averageLastThreeMonthsValue = Number(maxExpenseRow.last_month_total);
                let averageLastThreeMonthsFormatted = isNaN(averageLastThreeMonthsValue)? 'N/A' : averageLastThreeMonthsValue.toFixed(2);

                res.json({
                    last_month_total: maxExpenseRow.last_month_total,
                    max_last_month_expense: `${maxDescription} (${maxExpenseRow.max_last_month_expense})`,
                    last_month_date: maxExpenseRow.last_month_date.toISOString().split('T')[0],
                    average_last_three_months: averageLastThreeMonthsFormatted,
                    last_month_income_total: lastMonthIncomeTotal.toFixed(2),
                    difference: difference.toFixed(2) // Добавляем разницу между доходами и расходами
                });
            } else {
                res.status(404).json({ message: 'No data found.' });
            }            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while fetching data." });
        }
    }
};

module.exports = AnalisController;


//
//last_month_total: указывает на общаяя сумма трат 
//max_last_month_expense: обозначает максимальную сумму трат за последний месяц. 

//cредняя сумма трат в месяц (сумма трат за последние 3 месяца разделенная на 3 )
