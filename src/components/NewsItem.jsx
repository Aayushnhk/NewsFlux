import React from 'react';

const NewsItem = (props) => {
  const {
    title,
    description,
    imageUrl,
    newsUrl,
    author,
    date,
    source,
    mode
  } = props;

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
      <div
        className={`card shadow-sm rounded-4 border-${mode === 'dark' ? 'secondary' : 'light'} h-100 w-100 d-flex flex-column`}
        style={cardStyles}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={imageUrl || fallbackImage}
            className="card-img-top rounded-top-4"
            alt={title || "News Image"}
            onError={(e) => {
              console.log("Fallback image used for:", title);
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            style={{
              maxHeight: "200px",
              objectFit: "cover",
              width: '100%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              zIndex: 1
            }}
          >
            <span
              className="badge bg-danger text-uppercase"
              style={{ fontSize: "0.75rem", padding: "0.5em 0.75em" }}
            >
              {source}
            </span>
          </div>
        </div>

        <div className="card-body d-flex flex-column flex-grow-1 px-3">
          <h5 className="card-title fw-semibold mb-2" style={{ fontSize: "1.1rem" }}>
            {title || "Untitled"}
          </h5>
          <p className="card-text mb-3" style={{ fontSize: "0.95rem" }}>
            {description || "No description available."}
          </p>
          <p className="card-text mt-auto mb-3">
            <small className={`text-${mode === 'dark' ? 'light' : 'muted'}`}>
              By {author || "Unknown"} on {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
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
