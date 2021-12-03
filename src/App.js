import { Route, Routes } from 'react-router';
import './App.css';
import CreateRecipe from './components/CreateRecipe';
import Navbar from './components/Navbar';
import Recipecook from './components/Recipecook';
import Restaurant from './components/Restaurant';
import Theme from './components/Theme';
import React, { useState } from 'react';
import { ModalProvider } from './context/ModalContext';
import ResetPassword from './components/ResetPassword';
import UserDashboard from './components/UserDashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <ModalProvider>
        <Navbar setSearchTerm={setSearchTerm} />
      </ModalProvider>
      <Theme />
      <Routes>
        <Route path="/" element={<Restaurant searchTerm={searchTerm} />}></Route>
        <Route path="/createrecipe" element={<CreateRecipe />}></Route>
        <Route path="/createrecipe/:recipeid" element={<CreateRecipe />}></Route>
        <Route path="/recipe/:recipeid" element={<Recipecook />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/user" element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }></Route>
      </Routes>
    </>
  );
}

export default App;
