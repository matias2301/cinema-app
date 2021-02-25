const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//create server
const app = express();

//connect to AdminProject DB
connectDB();

//app port
const PORT = process.env.PORT || 4000;

//enable cors
app.use(cors());

//enabled body-parser
app.use( express.json({ extended: true }));

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favs', require('./routes/favourites'));
app.use('/api/images', require('./routes/images'));

//listen port
app.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`);
});