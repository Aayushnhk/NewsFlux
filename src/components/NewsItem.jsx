import React from "react";

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, source, mode } =
    props;

  const fallbackImage = "https://placehold.co/600x400/png?text=No+Image";

  const cardStyles = {
    height: "420px",
    width: "100%",
    backgroundColor: mode === "dark" ? "#1e293b" : "#ffffff",
    color: mode === "dark" ? "#f8fafc" : "#1e293b",
    transition: "all 0.3s ease",
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "No description available.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="my-3 d-flex">
      <div
        className={`card shadow-sm rounded-4 border-${
          mode === "dark" ? "secondary" : "light"
        } h-100 w-100 d-flex flex-column`}
        style={cardStyles}
      >
        <div style={{ position: "relative", height: "200px" }}>
          <img
            src={imageUrl || fallbackImage}
            className="card-img-top rounded-top-4 h-100"
            alt={title || "News Image"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            style={{
              objectFit: "cover",
              width: "100%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              right: "4px",
              zIndex: 1,
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

        <div
          className="card-body d-flex flex-column px-3 py-2"
          style={{
            overflow: "hidden",
            height: "240px",
          }}
        >
          <h5
            className="card-title fw-semibold mb-1"
            style={{
              fontSize: "1.1rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title || "Untitled"}
          </h5>
          <p
            className="card-text mb-1"
            style={{
              fontSize: "0.95rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flexGrow: 1,
              minHeight: "1rem",
            }}
          >
            {truncateText(description, 200)}
          </p>
          <p
            className="card-text mb-1"
            style={{
              minHeight: "1.25rem",
              overflow: "hidden",
            }}
          >
            <small className={`text-${mode === "dark" ? "light" : "muted"}`}>
              By {author || "Unknown"} on {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className={`btn btn-sm btn-outline-${
              mode === "dark" ? "light" : "dark"
            } w-100 mt-auto`}
            style={{ height: "2.25rem" }}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
