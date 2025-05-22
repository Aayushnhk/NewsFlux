import React from 'react';

const Spinner = ({ mode }) => {
  const loaderStyle = {
    '--loader-color': mode === 'dark' ? '#FFF' : '#000',
    '--loader-accent': mode === 'dark' ? '#FF3D00' : '#FF3D00'
  };

  const textClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className="text-center d-flex flex-column align-items-center justify-content-center" style={{ height: '100%' }}>
      <div className="loader" style={loaderStyle}></div>
      <p className={`${textClass} mt-3`}>Loading news...</p>
    </div>
  );
};

export default Spinner;