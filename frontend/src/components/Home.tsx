import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
    <div>
      <h1>A little message above</h1>
      <Link to="/contact"><button>Go to Contact Page</button></Link>
      <div>
        <a href="https://twitter.com">Twitter</a>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://instagram.com">Instagram</a>
      </div>
    </div>
  );
};

export default Home;
