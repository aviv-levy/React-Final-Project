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
import ViewCardPage from './Pages/ViewCardPage';
import EditUserPage from './Pages/EditUserPage';
import RouteGuard from './auth/RouteGuard';
import BizRouteGuard from './auth/BizRouteGuard';
import AdminRouteGuard from './auth/AdminRouteGuard';
import LoginRouteGurard from './auth/LoginRouteGuard';


export const LoggedInContext = createContext<context | null>(null);
export const CopiedCardsContext = createContext<CopyCardsContext | null>(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(verifyToken());
  const [userDetails, setUserDetails] = useState<User>();
  const [filteredCards, setFilteredCards] = useState<Array<Cards>>();
  const [copyCards, setCopyCards] = useState<Array<Cards>>();

  const [darkMode, setDarkMode] = useState(false);

  //Check for token when initilize app
  //If there is a token get user details by token from server
  useEffect(() => {
    if (verifyToken()) {
      const getUserDetailss = async () => setUserDetails(await getUserDetails())
      getUserDetailss()
        .then(() => setIsLoading(false))
        .catch((err) => {
          if (err)
            removeToken();
        });
    }
    else
      setIsLoading(false)
  }, [])

  return (
    <>
      {!isLoading &&
        <div className={`containerr ${darkMode && 'text-white darkMode'}`}>

          <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, filteredCards, setFilteredCards, darkMode, setDarkMode }}>
            <CopiedCardsContext.Provider value={{ copyCards, setCopyCards }}>
              <Navbar />

              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/favorites' element={<RouteGuard><FavPage /> </RouteGuard>} />
                <Route path='/mycards' element={<BizRouteGuard><MyCardsPage /></BizRouteGuard>} />
                <Route path='/sandbox' element={<AdminRouteGuard><SandboxPage /></AdminRouteGuard>} />
                <Route path='/login' element={<LoginRouteGurard><LoginPage /></LoginRouteGurard>} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/addCard' element={<BizRouteGuard><AddCardPage /></BizRouteGuard>} />
                <Route path='/editCard/:cardId' element={<BizRouteGuard><EditCardPage /></BizRouteGuard>} />
                <Route path='/viewCard/:cardId' element={<ViewCardPage />} />
                <Route path='/account/:userId' element={<RouteGuard><EditUserPage /></RouteGuard>} />
              </Routes>
            </CopiedCardsContext.Provider>

            <Footer />
          </LoggedInContext.Provider>
        </div>
      }
    </>
  );
}

export default App;
