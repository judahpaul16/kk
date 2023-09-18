import React, { useState } from 'react';
import Contact from './components/Contact';
import 'font-awesome/css/font-awesome.min.css';
import logo from './logo.svg';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-with-logo">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="title-text">KevinKirton.com</h1>
        </div>
        <p>
          Get in contact with me now
        </p>
        <button className="btn" onClick={toggleModal}>
          Contact
        </button>
        <div className="social-icons">
          <a href="https://www.facebook.com/kevin.kirton" target="_blank" rel="noreferrer">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.linkedin.com/in/kirton/" target="_blank" rel="noreferrer">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/i_b_kev/" target="_blank" rel="noreferrer">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </header>
      {showModal && <Contact closeModal={toggleModal} />}
    </div>
  );
}

export default App;