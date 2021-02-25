const multer = require("multer");
const shortid = require('shortid');
const fs = require('fs');

exports.uploadImage = async (req, res, next) => {

    const configMulter = {
        limits: { fileSize: 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../../client/src/assets/uploads')                
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
    console.log(req.params);
    console.log('req.params');

    try {
        fs.unlinkSinc(__dirname+`/../../client/src/${req.body}`);
    } catch (error) {
        console.log({ error });
    }
}