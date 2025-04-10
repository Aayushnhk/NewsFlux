import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ mode, toggleMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <style>
        {`
          .custom-search::placeholder {
            color: ${mode === 'dark' ? '#adb5bd' : '#6c757d'};
          }

          @media (min-width: 992px) {
            .navbar-collapse {
              justify-content: center;
            }
          }
        `}
      </style>

      <nav className={`navbar fixed-top navbar-expand-lg navbar-${mode} bg-${mode} shadow-sm py-3`}>
        <div className="container-fluid px-4">

          {/* Left - Logo */}
          <Link className="navbar-brand fw-bold fs-4 mb-0" to="/">📰 NewsFlux</Link>

          {/* Right side - Toggle, Search Button, Hamburger */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            {/* Dark Mode Toggle */}
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="darkModeToggle"
                onChange={toggleMode}
                checked={mode === 'dark'}
              />
            </div>

            {/* Search Icon Button */}
            <button
              className={`btn btn-outline-${mode === 'light' ? 'dark' : 'light'} p-2`}
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="fas fa-search"></i>
            </button>

            {/* Hamburger for mobile only */}
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Middle - Collapsible Menu for links (centered on PC) */}
          <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarNav">
            <ul className="navbar-nav mx-lg-auto gap-2 text-center">
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
          </div>
        </div>

        {/* Floating Search Input Field (conditionally visible) */}
        {showSearch && (
          <div className="container-fluid mt-2 px-4">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className={`form-control custom-search text-${mode === 'dark' ? 'light' : 'dark'}`}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  backgroundColor: mode === 'dark' ? '#212529' : '#fff',
                  color: mode === 'dark' ? '#f8f9fa' : '#212529',
                  borderColor: mode === 'dark' ? '#495057' : '#ced4da',
                  caretColor: mode === 'dark' ? '#f8f9fa' : '#212529',
                }}
              />
            </form>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
