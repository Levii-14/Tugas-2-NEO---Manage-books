const prisma = require("../config/prisma");

// GET ALL BOOKS
const getAllBooks = async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();

    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

// GET BOOK BY ID
const getBookById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE BOOK
const createBook = async (req, res, next) => {
  try {
    const { title, author, price, stock } = req.body;

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        price,
        stock,
      },
    });

    res.status(201).json({
      success: true,
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE BOOK
const updateBook = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const updatedBook = await prisma.book.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE BOOK
const deleteBook = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await prisma.book.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Buku berhasil dihapus",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};