import React from 'react';
import loading from './loading.gif';

const Spinner = ({ mode }) => {
  const divStyle = {
    padding: '1rem',
    borderRadius: '8px',
  };
  const textClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className="text-center" style={divStyle}>
      <img className="my-3" src={loading} alt="loading" />
      <p className={textClass}>Loading news...</p>
    </div>
  );
};

export default Spinner;