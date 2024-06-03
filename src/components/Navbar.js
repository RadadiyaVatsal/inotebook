import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertContext from '../contexts/alertContext';
import NoteContext from '../contexts/noteContext';
const Navbar = () => {
  const location = useLocation();
  const alertCon = useContext(AlertContext);
  const { updateMsg: alertMsg , isLoggedIn } = alertCon;
  const navigate = useNavigate();
  const noteCon=useContext(NoteContext);

  const {setLogin} =noteCon;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    alertMsg("Successfully logged out" , "success");
    setLogin(false);
  }

  useEffect(() => {
    const handlePopState = () => {
      if (!localStorage.getItem("token")) {
        window.history.pushState(null, '', '/');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">inotebook</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {
              
              !localStorage.getItem("token") &&
              <div>
                <Link className="btn btn-primary mx-2" to="/login" role="button" >Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
              </div>
            }
            {
            localStorage.getItem("token") &&
              <button className="btn btn-primary mx-2" onClick={handleLogout}>LogOut</button>
            }
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
