import React from 'react';
import './Home.css'
import '../../Global.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='background-image'>
      <main>
        <div className="center-content">
          <h1 className='title'>Magic World</h1>
          <p className='text-white-center'>RPG Turn Based</p>
          <div className='btns-container'>
            <Link to={'/Select'}>
              <button className='btn-home'>Adventure</button>
            </Link>
            <Link to={'/Characters'}>
              <button className='btn-home'>Characters</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
