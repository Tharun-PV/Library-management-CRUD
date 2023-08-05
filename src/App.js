import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Login from './login';
import Signup from './signup';
import Payment from './payment';
import Books from './books';
import AdminLogin from './AdminLogin';
import AddBook from './AddBook';
import UserBooking from './UserBooking';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <AppContent users={users} />
    </Router>
  );
}

const AppContent = ({ users }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    // Clear any user data or authentication tokens
    // Redirect the user to the login page
    navigate('/login');
  };
  return (
      <div className="App">
      <header>
        <nav>
          <ul>
          <li className='logo-img'>
            <a href="/">
              <img src='logo.png' alt='logo 1' />BookReads
            </a>
          </li>
          
            <li><a href="/" className='bold'>Home</a></li>
            <li><a href="/login" className='bold'>Login</a></li>
            <li><a href='/admin' className='bold'>Admin Login</a></li>
            <div className="right-links">
            <li><a href="/signup" className='bold'>Sign up</a></li>
            </div>
            <li><button className='bold' onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/book" element={<Books />} />
          <Route exact path="/admin" element={<AdminLogin />} /> 
          <Route exact path="/add-book" element={<AddBook />} /> 
          <Route exact path='/user-booking' element={<UserBooking />} />
          <Route path="/" element={<Home users={users} />} />
        </Routes>
        </main>
      <footer>
        <p>&copy; 2023 Library Management System</p>
      </footer>
      </div>

  );
}

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
    <section className="intro">
        <div className="intro-content">
          <div className="intro-text">
            <h1>Summer BookReads</h1>
            <p>
            Unleash your imagination, dive into captivating stories, and 
            expand your knowledge with our vast collection of books. BookReads 
            invites you to discover a world of literary wonders and embark on an unforgettable journey through words.
            </p><br />
            <Link to="/book">
            <button className="intro-button">Learn More</button>
            </Link>
          </div>
          <div className="intro-image">
            <img src="summer-reading.png" alt="Book Intro" />
          </div>
        </div><br />
      </section>
      <section className="books">
        <h2 className="top-picks">Top Picks For You</h2>
        <div className="slideshow-container">
          <div
            className="mySlides fade"
            style={{ display: slideIndex === 0 ? 'block' : 'none' }}
          >
            <h3>The Harry Potter</h3>
            <img src="book1.png" alt="Book 1" className="book-image" />
            <p>
              Join a journey of a magical world, <br />
              filled with a plethora of magical <br />
              creatures and beings.
            </p>
          </div>
          <div
            className="mySlides fade"
            style={{ display: slideIndex === 1 ? 'block' : 'none' }}
          >
            <h3>Red White & Royal Blue</h3>
            <img src="book2.png" alt="Book 2" className="book-image" />
            <p>
              Do you wanna know the feeling, <br />
              When you meet someone and <br />
              Your Heart Skips a Beat?
            </p>
          </div>
          <div
            className="mySlides fade"
            style={{ display: slideIndex === 2 ? 'block' : 'none' }}
          >
            <h3>To Kill a Mocking Bird</h3>
            <img src="book3.png" alt="Book 3" className="book-image" />
            <p>
              Mocking Birds don't do one thing, <br />
              but make music for us <br />
              to enjoy.
            </p>
          </div>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          <span className={`dot ${slideIndex === 0 ? 'active' : ''}`}></span>
          <span className={`dot ${slideIndex === 1 ? 'active' : ''}`}></span>
          <span className={`dot ${slideIndex === 2 ? 'active' : ''}`}></span>
        </div>
      </section>
      <section className="book-intro">
        <div
          className='book-intro-content'
        >
          <img src="book4.png" alt="Book 4" className="book-intro-image" />
          <div className="book-intro-text">
            <h1 className="great-gatsby">The GREAT GATSBY</h1>
            <h2>Author: F.Scott Fitzgerald</h2>
            <p>
              Set in the Roaring Twenties, it explores themes of wealth, love,
              and the pursuit of the American Dream. The story follows the
              mysterious millionaire Jay Gatsby and his pursuit of his lost
              love, Daisy Buchanan. With its vivid portrayal of the Jazz Age
              and its critique of the shallow and materialistic society, the
              novel depicts first-person narrator Nick Carraway's interactions
              with mysterious millionaire Jay Gatsby and Gatsby's obsession to
              reunite with his former lover, Daisy Buchanan.
            </p>
            <h3>Price: $20</h3>
            <div className="button-container">
              <button className="read"><Link to="/payment">Buy Now</Link></button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
