// SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const SearchResults = ({ apiKey }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search).get('q');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}&pageSize=10`;
                const response = await fetch(url);
                const data = await response.json();
                setArticles(data.articles || []);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, apiKey]);

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <h2 className="text-center mb-4">Search Results for "{query}"</h2>
            {loading ? (
                <Spinner />
            ) : (
                <div className="row">
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div className="col-md-4" key={index}>
                                <NewsItem
                                    title={article.title}
                                    description={article.description}
                                    imageUrl={article.urlToImage}
                                    newsUrl={article.url}
                                    author={article.author}
                                    date={article.publishedAt}
                                    source={article.source.name}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
