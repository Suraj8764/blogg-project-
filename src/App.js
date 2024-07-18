import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostList from './component/BlogPostList'
import BlogPostDetails from './component/BlogPostDetail'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BlogPostList />} />
                <Route path="/post/:id" element={<BlogPostDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
