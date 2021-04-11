import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //console.log('Header', loggedInUser);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light mb-5 pt-3">
                <div className="container-fluid">
                    <h1 class="navbar-brand" style={{ fontWeight: 'bold' }} >Tree-Station</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon float-end"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto float-end" align="right">
                            <li class="nav-item ">
                                <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            <li class="nav-item ">
                                <Link class="nav-link active" to="/orders">My Orders</Link>
                            </li>
                            <li class="nav-item ">
                                <Link class="nav-link active" to="/admin">Admin</Link>
                            </li>
                            <li class="nav-item ">
                                <Link class="nav-link active" to="#">Deals</Link>
                            </li>
                            {loggedInUser.isSignedIn ?
                                <li class="nav-item login" style={{ fontWeight: 'bold' }} >
                                    <span class="nav-link active userName" style={{ cursor: 'default', fontWeight: 'bold', color: 'white' }} onClick={() => setLoggedInUser({})}>{loggedInUser.name}</span>
                                </li>
                                :

                                <li class="nav-item login">
                                    <Link class="nav-link active " style={{ color: 'white' }} to="/login">Login</Link>
                                </li>
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;