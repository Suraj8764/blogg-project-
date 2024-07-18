import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPostContext } from '../context/BlogPostContext';

const BlogPostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts } = useContext(BlogPostContext);

    const post = posts ? posts.find((post, index) => index === parseInt(id)) : null;

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
                Back
            </button>
            {post ? (
                <div className="post-details">
                    <h1 className="post-title">{post.title}</h1>
                    <h2 className="post-author">Author: {post.author || "Unknown"}</h2>
                    {post.urlToImage && (
                        <img src={post.urlToImage} alt={post.title} className="img-fluid post-image" />
                    )}
                    <p className="post-content">{post.content}</p>
                </div>
            ) : (
                <p className="text-danger">Post not found</p>
            )}
        </div>
    );
};

export default BlogPostDetails;
