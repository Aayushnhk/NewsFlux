import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import SearchResults from './components/SearchResults';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 6;
  const apiKey = import.meta.env.VITE_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = mode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [mode]);

  return (
    <div>
      <Router>
        <NavBar mode={mode} toggleMode={toggleMode} />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="" pageSize={pageSize} country="us" category="" mode={mode} />} />
          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" mode={mode} />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" mode={mode} />} />
          <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" mode={mode} />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" mode={mode} />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" mode={mode} />} />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" mode={mode} />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" mode={mode} />} />
          <Route path="/search" element={<SearchResults setProgress={setProgress} apiKey={apiKey} mode={mode} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
