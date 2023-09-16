import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Contact from './components/Contact';

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
      </header>
      {showModal && <Contact closeModal={toggleModal} />}
    </div>
  );
}

export default App;