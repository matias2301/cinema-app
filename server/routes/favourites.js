const express = require('express');
const router = express.Router();
const favController = require('../controllers/favourite.controller');
// const authenticate = require('../middleware/authenticate');
const { check } = require('express-validator');

router.post('/',
    // authenticate,
    [
        check('title', 'Field title is required').not().isEmpty(),
        check('overview', 'Field overview is required').not().isEmpty()
    ],
    favController.addFavourite
);

router.get('/',
    // authenticate,
    favController.getFavourites
);

router.put('/:id',
    // authenticate,
    [
        check('title', 'Field title is required').not().isEmpty(),
        check('overview', 'Field overview is required').not().isEmpty()
    ],
    favController.updateFavourite
);

router.delete('/:id',
    // authenticate,
    favController.deleteFavourite,
);

module.exports = router;