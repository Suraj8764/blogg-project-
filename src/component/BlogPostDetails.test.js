import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPostDetails from './BlogPostDetail';
import { BlogPostContext } from '../context/BlogPostContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const renderWithContext = (component, { posts }) => {
  return render(
    <BlogPostContext.Provider value={{ posts }}>
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/:id" element={component} />
        </Routes>
      </MemoryRouter>
    </BlogPostContext.Provider>
  );
};

describe('BlogPostDetails', () => {
  const mockPosts = [
    {
      title: 'Test Title 1',
      author: 'Author 1',
      content: 'Test Content 1',
      urlToImage: 'test-image-1.jpg',
    },
    {
      title: 'Test Title 2',
      author: 'Author 2',
      content: 'Test Content 2',
      urlToImage: 'test-image-2.jpg',
    },
  ];

  test('renders post details', () => {
    renderWithContext(<BlogPostDetails />, { posts: mockPosts });

    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    expect(screen.getByText('Author: Author 2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Title 2')).toBeInTheDocument();
    expect(screen.getByText('Test Content 2')).toBeInTheDocument();
  });

  test('shows "Post not found" message when post is not found', () => {
    renderWithContext(<BlogPostDetails />, { posts: [] });

    expect(screen.getByText('Post not found')).toBeInTheDocument();
  });

  test('navigates back when "Back" button is clicked', () => {
    const { container } = renderWithContext(<BlogPostDetails />, { posts: mockPosts });

    const backButton = container.querySelector('.btn-secondary');
    fireEvent.click(backButton);

    expect(window.history.state).toBeNull();
  });
});
