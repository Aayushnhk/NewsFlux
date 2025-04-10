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
      {/* Inject dynamic styles for placeholder */}
      <style>
        {`
          .custom-search::placeholder {
            color: ${mode === 'dark' ? '#adb5bd' : '#6c757d'};
          }
        `}
      </style>

      <nav className={`navbar fixed-top navbar-expand-lg navbar-${mode} bg-${mode} shadow-sm py-3`}>
        <div className="container-fluid px-4 d-flex justify-content-between align-items-center">

          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-4" to="/">📰 NewsFlux</Link>

          {/* Mobile: Search + Dark Toggle */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            <button
              className={`btn btn-outline-${mode === 'light' ? 'dark' : 'light'}`}
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="fas fa-search"></i>
            </button>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="mobileDarkModeToggle"
                onChange={toggleMode}
                checked={mode === 'dark'}
              />
            </div>
          </div>

          {/* Hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarNav">
            <ul className="navbar-nav me-auto gap-2 text-center">
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>

            {/* Desktop: Search + Dark Toggle */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              {showSearch && (
                <form className="d-flex align-items-center" onSubmit={handleSearch}>
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
              )}

              <button
                className={`btn btn-outline-${mode === 'light' ? 'dark' : 'light'}`}
                onClick={() => setShowSearch(!showSearch)}
              >
                <i className="fas fa-search"></i>
              </button>

              <div className="form-check form-switch ms-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="darkModeToggle"
                  onChange={toggleMode}
                  checked={mode === 'dark'}
                />
                <label className={`form-check-label text-${mode === 'light' ? 'dark' : 'light'}`} htmlFor="darkModeToggle">
                  {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
