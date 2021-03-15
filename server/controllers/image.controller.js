const Favourite = require("../models/Favourite");
const multer = require("multer");
const shortid = require('shortid');
const fs = require('fs');
const path = require('path');

exports.uploadImage = async (req, res, next) => {

    const configMulter = {
        limits: { fileSize: 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')                
            },
            filename: (req, file, cb) => {                
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                cb( null, `${shortid.generate()}${extension}` );
            }
        })
    }

    const upload = multer(configMulter).single('image');

    upload( req, res, async(error) => {                
        if(!error) res.json( {file: req.file.filename} );

        return next();
    });
}

exports.deleteImage = async (req, res, next) => {   

    try {
        fs.unlinkSinc(__dirname+`/../uploads/${req.body}`);
    } catch (error) {
        console.log({ error });
    }
}

exports.getImage = async (req, res, next) => {
    
    const { image } = req.params;  

    var urlImage = path.resolve(__dirname, `../../server/uploads/${image}`);
    console.log(urlImage)  

    if (fs.existsSync(urlImage)) {
        res.sendFile(urlImage);
    } else {
        let urlImage = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(urlImage);
    }

}