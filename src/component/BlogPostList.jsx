import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogPostContext } from '../context/BlogPostContext';

const BlogPostList = () => {
  const { posts, page, setPage, totalPages } = useContext(BlogPostContext);

  return (
    <div className="container mt-4">
      <h1>Blog Posts</h1>
      <ul className="list-group">
        {posts?.map((post, index) => (
          <li key={index} className="list-group-item">
            {post.urlToImage && (
              <img src={post.urlToImage} alt={post.title} className="img-fluid mb-3" style={{ maxHeight: '200px' }} />
            )}
            <h5>{post.title}</h5>
            <p>{post.description}</p>
            <Link to={`/post/${index}`} className="btn btn-primary">
              Read More
            </Link>
          </li>
        ))}
      </ul>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${page === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${page === i + 1 && 'active'}`}>
              <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BlogPostList;
