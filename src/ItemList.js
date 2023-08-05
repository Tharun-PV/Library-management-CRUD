import React from 'react';
import './ItemList.css'

const ItemList = ({ books, handleEditBook, handleDeleteBook }) => {
  return (
    <div className="item-list">
      <h2>View Books</h2>
      {books.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Book No</th>
              <th>Author</th>
              <th>Type</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.bookNo}</td>
                <td>{book.author}</td>
                <td>{book.type}</td>
                <td>{book.price}</td>
                <td>
                  <button onClick={() => handleEditBook(book._id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books to display.</p>
      )}
    </div>
  );
};

export default ItemList;
