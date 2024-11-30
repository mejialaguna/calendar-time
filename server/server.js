const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use(
  '/api/events',
  (req, res, next) => {
    const token = req.headers['x-token'];
    if (!token) {
      return res.redirect('/login');
    }
    next();
  },
  require('./routes/events')
);

// Catch-all route for frontend
app.get('*', (req, res) => {
  // Serve index.html only for non-static requests
  if (!req.path.startsWith('/api') && !req.path.includes('.')) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  } else {
    res.status(404).send('Not Found');
  }
});

// 404 middleware for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    ok: false,
    message: 'The requested resource does not exist.',
  });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
