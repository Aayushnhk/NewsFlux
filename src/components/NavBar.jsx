import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ mode, toggleMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q") || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [showSearch, setShowSearch] = useState(false);
  const [showDesktopSearch, setShowDesktopSearch] = useState(false);
  const desktopSearchInputRef = useRef(null);
  const searchInputRef = useRef(null);
  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (showSearch && window.innerWidth < 992 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (showDesktopSearch && window.innerWidth >= 992 && desktopSearchInputRef.current) {
      desktopSearchInputRef.current.focus();
    }
  }, [showSearch, showDesktopSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      if (window.innerWidth < 992) {
        setShowSearch(false);
      } else {
        setShowDesktopSearch(false);
      }
    } else {
      if (window.innerWidth >= 992) {
        setShowDesktopSearch(false);
      }
    }
  };

  return (
    <>
      <style>
        {`
          .custom-search::placeholder {
            color: ${mode === 'dark' ? '#adb5bd' : '#6c757d'};
          }

          .form-check-input.cursor-pointer,
          .form-check-label.cursor-pointer {
            cursor: pointer !important;
          }

          @media (min-width: 992px) {
            .nav-link {
              padding: 0.5rem 1rem;
              position: relative;
            }
            .nav-link:after {
              content: '';
              position: absolute;
              width: 0;
              height: 2px;
              bottom: 0;
              left: 0;
              background-color: ${mode === 'dark' ? '#fff' : '#000'};
              visibility: hidden;
              transition: all 0.3s ease-in-out;
            }
            .nav-link:hover:after {
              visibility: visible;
              width: 100%;
            }
            .search-toggle-btn {
              margin-left: 1rem;
            }
            .mobile-search-bar {
              display: ${showSearch ? 'flex' : 'none'} !important;
              width: 100%;
              margin-top: 5px;
            }
            .nav-categories-container {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
            }
            .nav-categories {
              display: flex;
              justify-content: center;
              width: max-content;
              margin: 0 auto;
            }
            .desktop-search-form {
              transition: width 0.3s ease-in-out, margin-right 0.3s ease-in-out;
              overflow: hidden;
              width: ${showDesktopSearch ? '200px' : '0'};
              margin-right: ${showDesktopSearch ? '1rem' : '0'};
              display: ${showDesktopSearch ? 'flex' : 'none'};
            }
            .desktop-search-form input {
              width: 100%;
            }
          }
          @media (max-width: 991.98px) {
            .mobile-search-bar {
              display: ${showSearch ? 'flex' : 'none'} !important;
              width: 100%;
              margin-top: 5px;
            }
            .d-flex.d-lg-none {
                gap: 0.75rem;
            }
          }
        `}
      </style>

      <nav className={`navbar fixed-top navbar-expand-lg navbar-${mode} bg-${mode} shadow-sm py-2`}>
        <div className="container-fluid px-4 position-relative">
          <Link className="navbar-brand fw-bold fs-4 me-4" to="/">📰 NewsFlux</Link>

          <div className="d-flex d-lg-none align-items-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
                role="switch"
                id="darkModeToggleMobile"
                onChange={toggleMode}
                checked={mode === 'dark'}
              />
              <label className={`form-check-label text-${mode === 'light' ? 'dark' : 'light'} cursor-pointer`} htmlFor="darkModeToggleMobile">
                <i className={`fas fa-${mode === 'light' ? 'moon' : 'sun'}`}></i>
              </label>
            </div>

            <button
              className={`btn btn-outline-${mode === 'light' ? 'dark' : 'light'} cursor-pointer`}
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="fas fa-search"></i>
            </button>

            <button
              className="navbar-toggler cursor-pointer"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="nav-categories-container">
              <ul className="navbar-nav nav-categories">
                {['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'].map((cat) => (
                  <li className="nav-item" key={cat}>
                    <Link className="nav-link" to={`/${cat}`}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-none d-lg-flex align-items-center ms-auto">
              {!showDesktopSearch && (
                <button
                  className={`btn btn-outline-${mode === 'light' ? 'dark' : 'light'} cursor-pointer me-3`}
                  onClick={() => setShowDesktopSearch(!showDesktopSearch)}
                >
                  <i className="fas fa-search"></i>
                </button>
              )}

              {showDesktopSearch && (
                <form
                  className={`d-flex desktop-search-form`}
                  onSubmit={handleSearch}
                >
                  <input
                    ref={desktopSearchInputRef}
                    className={`form-control me-2 custom-search text-${mode === 'dark' ? 'light' : 'dark'}`}
                    type="search"
                    placeholder="Search news..."
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
                  <button className={`btn btn-outline-${mode === 'light' ? 'dark' : 'light'} cursor-pointer`} type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              )}

              <div className="form-check form-switch">
                <input
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  role="switch"
                  id="darkModeToggle"
                  onChange={toggleMode}
                  checked={mode === 'dark'}
                />
                <label className={`form-check-label text-${mode === 'light' ? 'dark' : 'light'} cursor-pointer`} htmlFor="darkModeToggle">
                  <i className={`fas fa-${mode === 'light' ? 'moon' : 'sun'}`}></i>
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mobile-search-bar">
            <form className="w-100" onSubmit={handleSearch} style={{ padding: '0 15px' }}>
              <input
                ref={searchInputRef}
                className={`form-control custom-search text-${mode === 'dark' ? 'light' : 'dark'}`}
                type="search"
                placeholder="Search news..."
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
        </div>
      </nav>
    </>
  );
};

export default NavBar;