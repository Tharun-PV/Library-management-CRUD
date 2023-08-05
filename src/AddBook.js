import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBook.css';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    bookNo: '',
    author: '',
    type: '',
    price: '',
  });

  const [books, setBooks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditBook = (bookId) => {
    const bookToEdit = books.find((book) => book._id === bookId);
    if (bookToEdit) {
      setBookData({
        title: bookToEdit.title,
        bookNo: bookToEdit.bookNo,
        author: bookToEdit.author,
        type: bookToEdit.type,
        price: bookToEdit.price,
      });
      setIsEditMode(true);
      setEditBookId(bookId);
    }
  };

  const handleAddBook = async () => {
    if (!bookData.title || !bookData.bookNo || !bookData.author || !bookData.type || !bookData.price) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      if (isEditMode && editBookId) {
        const response = await axios.put(`http://localhost:8000/update-book/${editBookId}`, bookData);

        if (response.status === 200 && response.data && response.data.book) {
          setBooks((prevBooks) =>
            prevBooks.map((book) => (book._id === editBookId ? response.data.book : book))
          );
          setBookData({
            title: '',
            bookNo: '',
            author: '',
            type: '',
            price: '',
          });
          setIsEditMode(false);
          setEditBookId(null);
          alert('Book updated successfully!');
        } else {
          throw new Error('Failed to update the book.');
        }
      } else {
        const response = await axios.post('http://localhost:8000/add-book', bookData);

        if (response.status === 200 && response.data && response.data.book) {
          setBooks((prevBooks) => [...prevBooks, response.data.book]);
          setBookData({
            title: '',
            bookNo: '',
            author: '',
            type: '',
            price: '',
          });
          alert('Book added successfully!');
        } else {
          throw new Error('Failed to add the book.');
        }
      }
    } catch (error) {
      console.error('Error handling the book:', error);
      alert('Failed to handle the book. Please try again.');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8000/delete-book/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      alert('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting the book:', error);
      alert('Failed to delete the book. Please try again.', error.response);
    }
  };

  const handleUpdateBook = async (bookId) => {
    if (!bookData.title || !bookData.bookNo || !bookData.author || !bookData.type || !bookData.price) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/update-book/${bookId}`, bookData);
      if (response.status === 200 && response.data && response.data.book) {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === bookId ? response.data.book : book))
        );
        setBookData({
          title: '',
          bookNo: '',
          author: '',
          type: '',
          price: '',
        });
        setIsEditMode(false);
        setEditBookId(null);
        alert('Book updated successfully!');
      } else {
        throw new Error('Failed to update the book.');
      }
    } catch (error) {
      console.error('Error handling the book:', error);
      alert('Failed to handle the book. Please try again.');
    }
  };

  return (
    <div className="add-book-container">
      {isEditMode ? (
        <EditItemForm
          bookData={bookData}
          handleChange={handleChange}
          handleUpdateBook={() => handleUpdateBook(editBookId)}
        />
      ) : (
        <AddItemForm
          bookData={bookData}
          handleChange={handleChange}
          handleAddBook={handleAddBook}
        />
      )}

      <ItemList books={books} handleEditBook={handleEditBook} handleDeleteBook={handleDeleteBook} />
    </div>
  );
};

export default AddBook;
