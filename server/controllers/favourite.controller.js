const Favourite = require('../models/Favourite');
const { validationResult } = require('express-validator');


exports.addFavourite = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ) return res.status(400).json({ msg: errors.array() });

    try {       

        const favourite = new Favourite(req.body);        
        favourite.save();

        res.json({ 
            favourite,
            isSuccess: true,
            msg: 'Movie added to favourites'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
};

exports.getFavourites = async (req, res) => {
    
    try {
        const favourites = await Favourite.find();
        res.json({ favourites });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
};

exports.updateFavourite = async (req, res) => {    

    const errors = validationResult(req);
    if( !errors.isEmpty() ) return res.status(400).json({ msg: errors.array() });

    const movie = req.body;    
    
    try {
        let fav = await Favourite.findById(req.params.id);

        if(!fav) return res.status(400).json({ msg: 'Movie not found' });        

        fav = await Favourite.findByIdAndUpdate({ _id: req.params.id }, { $set: movie }, { new: true });

        res.json({ fav });

    } catch (error) {        
        res.status(500).send('An error has ocurred');
    }
    
};

exports.deleteFavourite = async (req, res) => {
    
    try {
        let fav = await Favourite.findById(req.params.id);        
        
        if(!fav) return res.status(400).json({ msg: 'Movie not found' });        

        fav = await Favourite.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: 'Movie removed successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
    
}