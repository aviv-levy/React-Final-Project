import React, { createContext, useEffect, useState } from 'react';
import './CSS/darkMode.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar';
import 'font-awesome/css/font-awesome.css';
import AboutPage from './Pages/AboutPage';
import FavPage from './Pages/FavPage';
import MyCardsPage from './Pages/MyCardsPage';
import SandboxPage from './Pages/SandboxPage';
import LoginPage from './Pages/LoginPage';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import { Cards, CopyCardsContext, User, context } from './Services/Interfaces';
import { removeToken, verifyToken } from './auth/TokenManager';
import RegisterPage from './Pages/RegisterPage';
import { getUserDetails } from './Services/ApiService';
import AddCardPage from './Pages/AddCardPage';
import EditCardPage from './Pages/EditCardPage';


export const LoggedInContext = createContext<context | null>(null);
export const CopiedCardsContext = createContext<CopyCardsContext | null>(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(verifyToken());
  const [userDetails, setUserDetails] = useState<User>();
  const [filteredCards, setFilteredCards] = useState<Array<Cards>>();
  const [copyCards, setCopyCards] = useState<Array<Cards>>();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (verifyToken()) {
      const getUserDetailss = async () => setUserDetails(await getUserDetails())
      getUserDetailss().catch((err) => {
        if (err)
          removeToken();
      });
    }
  }, [])

  return (
    <>
      <div className={darkMode ? 'containerr text-white darkMode' : 'containerr'}>

        <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, filteredCards, setFilteredCards, darkMode, setDarkMode }}>
          <CopiedCardsContext.Provider value={{ copyCards, setCopyCards }}>
            <Navbar />

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/favorites' element={<FavPage />} />
              <Route path='/mycards' element={<MyCardsPage />} />
              <Route path='/sandbox' element={<SandboxPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/addCard' element={<AddCardPage />} />
              <Route path='/editCard/:cardId' element={<EditCardPage />} />
            </Routes>
          </CopiedCardsContext.Provider>

          <Footer />
        </LoggedInContext.Provider>
      </div>
    </>
  );
}

export default App;
