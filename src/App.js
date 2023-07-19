import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Global.css';

import Home from './pages/Home/Home';
import Select from './pages/Select/Select';
import Characters from './pages/Characters/Characters';
import CharactersDetails from './pages/Characters/CharactersDetails';
import Battle from './pages/Battle/Battle'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharactersDetails />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </Router>
  );
}

export default App;
