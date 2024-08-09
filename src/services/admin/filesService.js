const models = require('../../models');
const fs = require('fs');
const path = require('path');

const fileService = {
    getAll: async () => {
        try {
            const data = await models.Files.findAll({
                order: [['fileId', 'DESC']]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    delete: async (id) => {
        try {
            const data = await models.Files.findOne({
                where: {
                    fileId: id
                }
            });
            if (data) {
                const fileName = data.filename;
                const filePath = path.join(__dirname, '../../..', 'uploads', fileName);
                // Check if the file exists
                if (fs.existsSync(filePath)) {
                    // Delete the file
                    fs.unlinkSync(filePath);
                     await models.Files.destroy({
                        where: {
                            fileId: id
                        }
                    });
                    return `File deleted successfully.`; // File deleted successfully
                } else {
                    console.log(`File '${fileName}' not found.`);
                    return `File not found.`; // File not found
                }
            }
            else{
                return `File not found. Invalid FileID.`; // File not found
            }
        } catch (error) {
            throw new Error('Failed to delete file');
        }
    },
    get: async (id) => {
        try {
            const data = await models.Files.findOne({
                where: {
                    fileId: id
                }
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = fileService;