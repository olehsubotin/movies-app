import { useState } from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img src='./hero.png' alt='Hero banner' />
            <h1>
              Find <span className='text-gradient'>Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <h3 className='text-white'>{searchTerm ? searchTerm : ''}</h3>
          </header>
        </div>
      </div>
    </main>
  );
}

export default App;
