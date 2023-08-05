const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/library-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bookNo: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema); // Add the Book model

// Function to get all books from the database
const getAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    throw new Error("Failed to fetch books from the database");
  }
};

module.exports = {
  User,
  Book,
  getAllBooks, // Export the function to get all books
};
