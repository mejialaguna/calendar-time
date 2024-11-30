const path = require('path');
const express = require("express");
require("dotenv").config(); 
const cors = require('cors');
const { dbConnection } = require("./database/config");

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

app.use( express.static('public') );

app.use( express.json() );

// routes
app.use('/api/auth', require('./routes/auth'));
app.use(
  '/api/events',
  (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.redirect('/login');
    }
    next();
  },
  require('./routes/events')
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname , 'public/index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({
    ok: false,
    message: 'The requested resource does not exist.',
  });
});

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
