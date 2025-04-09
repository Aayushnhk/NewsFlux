import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  const isSearchMode = location.pathname === '/search';

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const buildUrl = (pg) => {
    if (isSearchMode && searchTerm) {
      return `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${props.apiKey}&page=${pg}&pageSize=${props.pageSize}`;
    } else {
      return `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pg}&pageSize=${props.pageSize}`;
    }
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = buildUrl(page);
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    const title = isSearchMode && searchTerm
      ? `${capitalizeFirstLetter(searchTerm)} - Search Results - NewsFlux`
      : `${capitalizeFirstLetter(props.category)} - NewsFlux`;
    document.title = title;

    setPage(1);
    updateNews();
    // eslint-disable-next-line
  }, [searchTerm, props.category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = buildUrl(nextPage);
    setPage(nextPage);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults || 0);
  };

  return (
    <>
      <h1 className={`text-center ${props.mode === 'dark' ? 'text-light' : 'text-dark'}`} style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsFlux - Top {isSearchMode && searchTerm ? `"${capitalizeFirstLetter(searchTerm)}"` : capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className={`container ${props.mode === 'dark' ? 'bg-dark' : ''}`}>
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                  mode={props.mode}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default News;