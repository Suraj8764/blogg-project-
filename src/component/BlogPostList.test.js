import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPostList from '../component/BlogPostList';
import { BlogPostContext } from '../context/BlogPostContext';
import { BrowserRouter as Router } from 'react-router-dom';

const renderWithContext = (component, value) => {
  return render(
    <BlogPostContext.Provider value={value}>
      <Router>{component}</Router>
    </BlogPostContext.Provider>
  );
};

describe('BlogPostList', () => {
  const mockPosts = [
    {
      title: 'Test Title 1',
      description: 'Test Description 1',
      urlToImage: 'test-image-1.jpg',
    },
    {
      title: 'Test Title 2',
      description: 'Test Description 2',
      urlToImage: 'test-image-2.jpg',
    },
  ];

  test('renders blog posts', () => {
    renderWithContext(<BlogPostList />, { posts: mockPosts, page: 1, setPage: jest.fn(), totalPages: 2 });

    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Title 1')).toBeInTheDocument();

    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    expect(screen.getByText('Test Description 2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Title 2')).toBeInTheDocument();
  });

  test('handles pagination', () => {
    const setPage = jest.fn();
    renderWithContext(<BlogPostList />, { posts: mockPosts, page: 1, setPage, totalPages: 2 });

    fireEvent.click(screen.getByText('Next'));
    expect(setPage).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('Previous'));
    expect(setPage).toHaveBeenCalledWith(0);
  });
});
