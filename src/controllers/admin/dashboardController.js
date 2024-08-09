
const dashboardService = require('../../services/admin/dashboardService')

const dashboardController = {
    get: async (req, res) => {
        try {
            const data = await dashboardService.get();
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = dashboardController;