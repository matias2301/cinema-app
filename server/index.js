const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//create server
const app = express();

//connect to AdminProject DB
connectDB();

//app port
const port = process.env.PORT || 4000;

// Configure Cross Origin
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

//enable cors
app.use(cors());

//enabled body-parser
app.use( express.json({ extended: true }));

app.use( express.static('tmp') );

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favs', require('./routes/favourites'));
app.use('/api/images', require('./routes/images'));

//listen port
app.listen( port, '0.0.0.0', () => {
    console.warn(`Listening port ${port}`)    
});