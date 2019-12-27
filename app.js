const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// IMPORT ROUTES
const postsRoute = require('./routes/posts');

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/posts', postsRoute);

// ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
})

// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${ err.message }`);
    });

// HOW DO WE START LISTENING TO THE SERVER
app.listen(3000);