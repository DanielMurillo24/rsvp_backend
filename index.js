const express = require('express')
const cors = require('cors');
const {dbConnection} = require('./database/config');
require('dotenv').config();

const app = express();

dbConnection();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://rsvp-web-app-alpha.vercel.app',
    ], // Allow frontend to access backend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'x-token'], // Allowed headers
    credentials: true, // If using authentication (cookies, JWT, etc.)
}));

app.use( express.json() );

app.use('/api/auth', require('./routes/guestLogin'));

app.use('/api/guest', require('./routes/guest'));

app.listen (process.env.PORT, () => {
    console.log(`Server running in port ${ process.env.PORT }`);
});