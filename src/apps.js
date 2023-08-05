const express = require("express");
const { User, Book, getAllBooks } = require("./mongo");
const cors = require("cors");
const apps = express();
apps.use(express.json());
apps.use(cors());

apps.get("/", cors(), (req, res) => {
  // Handle the root endpoint if needed
});

apps.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

apps.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      res.json("notexist");
    }
  } catch (e) {
    res.status(500).json("fail");
  }
});

apps.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request received:", email, password);

    const user = await User.findOne({ email: email, password: password });

    if (user) {
      console.log("Login successful:", user);
      res.json("exist");
    } else {
      console.log("Login failed: Invalid credentials");
      res.json("notexist");
    }
  } catch (e) {
    console.log("Login failed: Internal server error");
    res.status(500).json("fail");
  }
});


apps.post("/add-book", async (req, res) => {
  const { title, bookNo, author, type, price } = req.body;

  try {
    const newBook = new Book({
      title,
      bookNo,
      author,
      type,
      price,
    });

    await newBook.save();
    res.json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding the book:", error);
    res.status(500).json({ error: "Failed to add the book" });
  }
});

apps.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

apps.delete("/delete-book/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndRemove(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the book" });
  }
});

apps.put("/update-book/:id", async (req, res) => {
  const bookId = req.params.id;
  const { title, bookNo, author, type, price } = req.body;

  try {
    // Find the book by ID and update its details
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, bookNo, author, type, price },
      { new: true } // Set { new: true } to return the updated book instead of the old one
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the book" });
  }
});

apps.get("/user-booking", (req, res) => {
  res.send("This is the UserBooking page");
});


apps.listen(8000, () => {
  console.log("Port Connected");
});
