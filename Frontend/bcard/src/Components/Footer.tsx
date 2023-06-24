import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCircleInfo, faIdCard } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext } from "../App";


function Footer() {

    const userDetails = useContext(LoggedInContext);
    
    return (
        <footer className="d-flex justify-content-center shadow-lg footer">
            <div className="text-center mx-4 p-3">
                <NavLink to='/about' className="nav-link">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <p style={{ padding: '0px', margin: '0px' }}>About</p>
                </NavLink>
            </div>
            {
                userDetails?.isLoggedIn &&
                <div className="text-center mx-4 p-3">
                    <NavLink to='/favorites' className="nav-link">
                        <FontAwesomeIcon icon={faHeart} />
                        <p style={{ padding: '0px', margin: '0px' }}>Favorites</p>
                    </NavLink>
                </div>
            }
            {                
                userDetails?.isLoggedIn && userDetails.userDetails?.biz &&
                <div className="text-center mx-4 p-3">
                    <NavLink to='/mycards' className="nav-link">
                        <FontAwesomeIcon icon={faIdCard} />
                        <p style={{ padding: '0px', margin: '0px' }}>My Cards</p>
                    </NavLink>
                </div>
            }
        </footer >
    );
}

export default Footer;