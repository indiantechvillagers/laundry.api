// fileService.js
const multer = require('multer');
const path = require('path');

const models = require("../../models")

const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default.
const config = require("../../../config/config.json")[env];

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName);
    }
});

// Multer file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

// Multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

exports.uploadSingleFile = upload.single('file');

exports.handleFileUpload = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Please upload a file' });
    }
    // File uploaded successfully, do something with the file
    const data = await models.Files.create({
        baseurl: config.api_static_url,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        fileurl: config.api_static_url + req.file.filename
    });

    return res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        file: {
            isActive: true,
            isDeleted: false,
            fileId: data.fileId,
            baseurl: config.api_static_url,
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            fileurl: config.api_static_url + req.file.filename
        }
    });
};

exports.getAll = async (req, res) => {
    try {
        const data = await models.Files.findAll({
            order: [['fileId', 'DESC']]
        });

        console.log(data)

        return res.status(200).json({ status: 200, data: data || [] });

        // return data;
    } catch (error) {
        // throw new Error(error.message);
        return res.status(500).json({ status: 500, error: error.message });
    }
};
