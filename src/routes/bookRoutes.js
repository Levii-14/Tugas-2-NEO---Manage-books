// src/routes/bookRoutes.js

const express = require('express');
const router = express.Router();

// Data sementara (in-memory)
let books = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', price: 150000, stock: 10 },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', price: 175000, stock: 5 },
];

let nextId = 3;

// GET /books - Ambil semua buku
router.get('/', (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        next(error);
    }
});

// GET /books/:id - Ambil satu buku
router.get('/:id', (req, res) => {
    try {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).json({
            success: false, 
            message: 'Buku tidak ditemukan' 
        });
    }

    res.status(200).json({
        success: true, 
        data: book 
    });
    } catch (error) {
        next(error);
    }
});

router.post('/', (req, res, next) => {
    try {
    const { title, author, price, stock } = req.body;

    if (!title || !author || !price || !stock) {
        return res.status(400).json({
            success: false,
            message: 'Terjadi kesalahan, mohon periksa lagi'
        });
    }

    const newBook = { id: nextId++, title, author, price, stock };
    books.push(newBook);

    res.status(201).json({ 
        success: true,
        data: newBook });

    } catch (error) {
        next(error);
    }   
});

// PUT /books/:id - Perbarui buku
router.put('/:id', (req, res, next) => {
    try {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
        return res.status(404).json({ 
            success: false,
            message: 'Buku tidak ditemukan' 
        });
    }

    books[index] = { id, ...req.body };
    res.status(200).json({ 
        success: true, 
        data: books[index] 
    });
    } catch (error) {
        next(error);
    }
});

// DELETE /books/:id - Hapus buku
router.delete('/:id', (req, res, next) => {
    try {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
        return res.status(404).json({ 
            success: false, 
            message: 'Buku tidak ditemukan'
        });
    }
    
    books.splice(index, 1);

    res.status(200).json({ 
        success: true, 
        message: 'Buku berhasil dihapus' 
    });
    } catch (error) {
        next(error);
    }
});

module.exports = router;



