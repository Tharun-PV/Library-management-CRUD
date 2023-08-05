import React from 'react';
import './EditItemForm.css'

const EditItemForm = ({ bookData, handleChange, handleUpdateBook }) => {
  return (
    <div className="edit-item-form">
      <h2>Edit Book</h2>
      <div>
        <label htmlFor="title">Book Title:</label>
        <input type="text" id="title" name="title" value={bookData.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="bookNo">Book No:</label>
        <input
          type="text"
          id="bookNo"
          name="bookNo"
          value={bookData.bookNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={bookData.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" value={bookData.type} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price" value={bookData.price} onChange={handleChange} />
      </div>
      <button onClick={handleUpdateBook}>Update Book</button>
    </div>
  );
};

export default EditItemForm;
