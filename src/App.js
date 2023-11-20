import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Navigation from './components/Navbar';
import Library from './components/Library';
import Account from './components/Account';
import { Addbook } from './components/Addbook';



function App() {
  return (
    <>
    <div>

      <AuthContextProvider>
        <Navigation />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/library' element={<ProtectedRoute><Library /></ProtectedRoute>} />
              <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path='/addbook' element={<ProtectedRoute><Addbook /></ProtectedRoute>} />


            </Routes> 
          </BrowserRouter>
      </AuthContextProvider>
    </div>
    </>
  );
}

export default App;
