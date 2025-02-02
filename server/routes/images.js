const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');


router.post('/',
    imageController.uploadImage
);

router.get('/:image',
    imageController.getImage
);

router.delete('/:image',
    imageController.deleteImage
);


module.exports = router;