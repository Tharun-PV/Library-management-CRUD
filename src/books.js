import React, { Component } from "react";

class Books extends Component {
  render() {
    return (
        <section className="books">
        <h2 className="top-picks">History Fiction</h2>
        <div className="book-list">
          <div
            className="book">
            <img src="hbook1.png" alt="Book 1" className="book-image" />
          </div>
          <div
            className="book"
          >
            <img src="hbook2.png" alt="Book 2" className="book-image" />
          </div>
          <div
            className="book"
          >
            <img src="hbook3.png" alt="Book 3" className="book-image" />

          </div>
        </div><br /><br />
        <h2 className="top-picks">Romance Fiction</h2>
        <div className="book-list">
          <div
            className="book">
            <img src="rbook1.png" alt="Book 1" className="book-image" />
          </div>
          <div
            className="book"
          >
            <img src="rbook2.png" alt="Book 2" className="book-image" />
          </div>
          <div
            className="book"
          >
            <img src="rbook3.png" alt="Book 3" className="book-image" />

          </div>
        </div>
      </section>
      
    );
  }
}

export default Books;
