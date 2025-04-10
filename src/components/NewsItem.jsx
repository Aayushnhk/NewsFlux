import React from 'react';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source, mode } = props;
  const fallbackImage = "https://placehold.co/600x400/png?text=No+Image";

  const cardStyles = {
    minHeight: "480px",
    width: "100%",
    backgroundColor: mode === 'dark' ? '#1e293b' : '#ffffff',
    color: mode === 'dark' ? '#f8fafc' : '#1e293b',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="my-4 d-flex">
      <div className={`card shadow-sm rounded-4 border-${mode === 'dark' ? 'secondary' : 'light'} h-100 d-flex flex-column`} style={cardStyles}>
        <div style={{ position: 'relative' }}>
          <img
            src={imageUrl || fallbackImage}
            className="card-img-top rounded-top-4"
            alt={title || "News Image"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            style={{ maxHeight: "200px", objectFit: "cover", width: '100%' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            zIndex: 1
          }}>
            <span
              className="badge bg-danger text-uppercase"
              style={{ fontSize: "0.75rem", padding: "0.5em 0.75em" }}
            >
              {source}
            </span>
          </div>
        </div>

        <div className="card-body d-flex flex-column flex-grow-1">
          <h5 className="card-title fw-bold" style={{ fontSize: "1.1rem" }}>{title}</h5>
          <p className="card-text" style={{ fontSize: "0.95rem" }}>
            {description ? description : "No description available."}
          </p>
          <p className="card-text mt-auto mb-2">
            <small className={`text-${mode === 'dark' ? 'light' : 'muted'}`}>
              By {author ? author : "Unknown"} on {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className={`btn btn-sm btn-outline-${mode === 'dark' ? 'light' : 'dark'} w-100`}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
