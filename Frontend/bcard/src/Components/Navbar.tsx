import { NavLink, Link } from 'react-router-dom'
import { removeToken } from '../auth/TokenManager';
import { useContext, useEffect, useState } from 'react';
import { CopiedCardsContext, LoggedInContext } from '../App';

function Navbar() {

    const [search, setSearch] = useState('');
    const isLoggedIn = useContext(LoggedInContext);
    const userDetails = useContext(LoggedInContext);
    const filteredCards = useContext(LoggedInContext);
    const darkMode = useContext(LoggedInContext);
    const copiedCardsArray = useContext(CopiedCardsContext)?.copyCards;

    //Logout Function
    function handleLogOut() {
        removeToken();
        isLoggedIn?.setIsLoggedIn(false);
        userDetails?.setUserDetails(undefined);
    }
    //Dark mode Function
    function handleDarkMode() {
        darkMode?.setDarkMode(!darkMode.darkMode);
    }

    //Search Hook when to filter cards when user write in search input.
    useEffect(() => {
        const filter = copiedCardsArray?.filter(card =>
            card.title.toLocaleLowerCase().includes(search))
        search === '' ? filteredCards?.setFilteredCards(copiedCardsArray) : filteredCards?.setFilteredCards(filter)
        // eslint-disable-next-line
    }, [search])

    return (
        // "navbar navbar-expand-lg bg-primary"
        <nav className={`navbar navbar-expand-lg ${!darkMode?.darkMode ? 'bg-primary' : ''}`} data-bs-theme="dark">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand"><strong className='fs-2 ms-1'>BCard</strong> </Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link active" aria-current="page">About</NavLink>
                        </li>
                        {
                            isLoggedIn?.isLoggedIn &&
                            <li className="nav-item">
                                <NavLink to="/favorites" className="nav-link active" aria-current="page">Fav Cards</NavLink>
                            </li>
                        }
                        {
                            isLoggedIn?.isLoggedIn && userDetails?.userDetails?.biz &&
                            <li className="nav-item">
                                <NavLink to="/mycards" className="nav-link active" aria-current="page">My Cards</NavLink>
                            </li>
                        }
                        {
                            isLoggedIn?.isLoggedIn && userDetails?.userDetails?.isAdmin &&
                            <li className="nav-item">
                                <NavLink to="/sandbox" className="nav-link active" aria-current="page">Sandbox</NavLink>
                            </li>
                        }
                    </ul>
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="form-group has-search">
                                    <span className="fa fa-search form-control-feedback"></span>
                                    <input
                                        type="text"
                                        className={`form-control ${!darkMode?.darkMode ? 'bg-light' : ''}`}
                                        placeholder="Search"
                                        onChange={(e) => setSearch(e.target.value)} />
                                </div>

                            </li>
                            <li className="nav-item">
                                <button onClick={handleDarkMode} className='btn mx-2'>
                                    {
                                        !darkMode?.darkMode ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
                                                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                                                <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                            </svg>
                                    }

                                </button>

                            </li>
                            {
                                isLoggedIn?.isLoggedIn ?
                                    <li className="nav-item">
                                        <div className="btn-group">
                                            <button className='bg-transparent border border-0 dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={userDetails?.userDetails?.img ? userDetails.userDetails.img :
                                                    "https://brsc.sa.edu.au/wp-content/uploads/2018/09/placeholder-profile-sq.jpg"}
                                                    className="navImg"
                                                    alt="user Pic" />
                                            </button>
                                            <ul className={`dropdown-menu dropdown-menu-end ${!darkMode?.darkMode ? 'bg-white' : ''}`}>
                                                <li><Link to={`/account/${userDetails?.userDetails?._id}`} className="nav-link active dropdown-color">Account</Link></li>
                                                <li><hr className="my-1" /></li>
                                                <li>
                                                    <button onClick={handleLogOut} className="nav-link active dropdown-color" aria-current="page">
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link active" aria-current="page">Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link active" aria-current="page">Login</NavLink>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;