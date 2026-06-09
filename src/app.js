const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const app = express();

// Middleware untuk membaca JSON dari request body
app.use(express.json());

// Middleware untuk membaca form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routing buku
app.use('/books', bookRoutes);

// Middleware 404 (endpoint tidak ditemukan)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Terjadi kesalahan pada server'
    });
});

module.exports = app;