import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserBooking.css';
import { useNavigate, Link } from 'react-router-dom';

const UserBooking = () => {
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the books created by the admin here
    axios
      .get('http://localhost:8000/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement the search logic here based on the book title entered
    // You can filter the books array using the bookTitle state value
    // and update the displayed list of books accordingly
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(bookTitle.toLowerCase())
    );
    setSearchedBooks(filteredBooks);
  };

  const handleBuyNow = (bookTitle) => {
    // Implement the logic here to navigate to the payment page
    // and pass the book title as a query parameter in the URL
    navigate(`/payment?title=${encodeURIComponent(bookTitle)}`);
  };

  return (
    <div className='user-booking'>
      <div className='left-side'>
        <div className='search-box'>
          <h2>Search Book</h2>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder='Enter book title'
            />
            <button type='submit'>Search</button>
          </form>
        </div>
        <div className='view-book-details'>
          <h2>View Book Details</h2>
          <ul>
            {searchedBooks.map((book) => (
              <li key={book._id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Type: {book.type}</p>
                <p>Price: {book.price}</p>
                {/* Pass the book title as a query parameter in the URL */}
                <Link to={`/payment?title=${encodeURIComponent(book.title)}`}>
                  <button>Buy Now</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='right-side'>
        <h2>Popular Books</h2>
        {/* Display the table of popular books here */}
        <table>
          <thead>
            {/* ... (your existing code) */}
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.type}</td>
                <td>{book.price}</td>
                <td>
                  {/* Pass the book title as a query parameter in the URL */}
                  <Link to={`/payment?title=${encodeURIComponent(book.title)}`}>
                    <button>Buy Now</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBooking;
