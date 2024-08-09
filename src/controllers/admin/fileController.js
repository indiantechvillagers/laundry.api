// fileController.js
const multer = require('multer');
const fileService = require('../../services/admin/fileService');

exports.uploadFile = (req, res) => {
    fileService.uploadSingleFile(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer error occurred
            return res.status(500).json({ success: false, message: err.message });
        } else if (err) {
            // Other errors occurred
            return res.status(500).json({ success: false, message: err.message });
        }
        // File uploaded successfully
        fileService.handleFileUpload(req, res);
    });
};

exports.getAll = (req, res) => {

    console.log("Getall");

    fileService.getAll(req, res);
    // return res.status(200).json({ status: 200, data: data || [] });
}
