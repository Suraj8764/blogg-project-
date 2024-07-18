import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BlogPostContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=blog&apiKey=289df4a4d34943caa1ea87b8bd01a79e&page=${page}`);
        setPosts(response.data.articles);
      
        setTotalPages(Math.ceil(response.data.totalResults / 10));
      } catch (error) {
        if (error.response && error.response.status === 426) {
          setError('Upgrade Required: Please upgrade your request to a supported protocol.');
        } else {
          setError('An error occurred while fetching the posts.');
        }
      }
    };
    fetchPosts();
  }, [page]);

  return (
    <BlogPostContext.Provider value={{ posts, page, setPage, totalPages, error }}>
      {children}
    </BlogPostContext.Provider>
  );
};
