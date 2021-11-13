import { Route, Routes } from 'react-router';
import './App.css';
import CreateRecipe from './components/CreateRecipe';
import Navbar from './components/Navbar';
import Recipecook from './components/Recipecook';
import Restaurant from './components/Restaurant';
import Theme from './components/Theme';
import React, { useState } from 'react';

function App() {
  const [navColor, setNavColor] = useState("purple");
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <Navbar navColor={navColor} setSearchTerm={setSearchTerm} />
      <Theme setNavColor={setNavColor} />
      <Routes>
        <Route path="/" element={<Restaurant searchTerm={searchTerm} navColor={navColor} />}></Route>
        <Route path="/createrecipe" element={<CreateRecipe navColor={navColor} />}></Route>
        <Route path="/recipe/:recipeid" element={<Recipecook />}></Route>
      </Routes>
    </>
  );
}

export default App;
