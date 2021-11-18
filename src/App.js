import { Route, Routes } from 'react-router';
import './App.css';
import CreateRecipe from './components/CreateRecipe';
import Navbar from './components/Navbar';
import Recipecook from './components/Recipecook';
import Restaurant from './components/Restaurant';
import Theme from './components/Theme';
import React, { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <Theme />
      <Routes>
        <Route path="/" element={<Restaurant searchTerm={searchTerm} />}></Route>
        <Route path="/createrecipe" element={<CreateRecipe />}></Route>
        <Route path="/recipe/:recipeid" element={<Recipecook />}></Route>
      </Routes>
    </>
  );
}

export default App;
