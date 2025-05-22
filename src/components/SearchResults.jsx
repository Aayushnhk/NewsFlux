import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const SearchResults = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const backendUrl = `https://newsfluxbackend.onrender.com/api/news?q=${encodeURIComponent(
          query
        )}&pageSize=10`;
        const response = await fetch(backendUrl);
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div
      className={`container ${props.mode === "dark" ? "bg-dark" : "bg-light"}`}
      style={{ marginTop: "100px", minHeight: "80vh" }}
    >
      <h2
        className={`text-center mb-4 ${
          props.mode === "dark" ? "text-light" : "text-dark"
        }`}
      >
        Search Results for "{query}"
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div className="col-md-4" key={article.url || index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                  mode={props.mode}
                />
              </div>
            ))
          ) : (
            <p
              className={`text-center ${
                props.mode === "dark" ? "text-light" : "text-dark"
              }`}
            >
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
