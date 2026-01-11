const express = require('express');
const authRoutes = require('./routes/urls');
const pool = require('./database/connect');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use authentication routes
app.use('/api/auth', authRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Authentication System');
});

// Handle 404 - route not found
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    success: false,
    message: err.message || 'Internal server error' 
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown for preventing connection leaks
const shutdown = async () => {
  console.log('Shutdown server signal received');

  server.close(async () => {
    await pool.end();
    console.log('Database pool has ended');
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown); // for interrupt signal (Ctrl+C) from keyboard for local development
