import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BlogProvider, BlogPostContext } from '../context/BlogPostContext';
import axios from 'axios';

jest.mock('axios');

describe('BlogProvider', () => {
  const mockResponse = {
    data: {
      articles: [
        {
          title: 'Test Title 1',
          description: 'Test Description 1',
          urlToImage: 'test-image-1.jpg',
        },
      ],
      totalResults: 1,
    },
  };

  test('fetches and provides blog posts', async () => {
    axios.get.mockResolvedValueOnce(mockResponse);

    let contextValue;
    render(
      <BlogProvider>
        <BlogPostContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BlogPostContext.Consumer>
      </BlogProvider>
    );

    await waitFor(() => {
      expect(contextValue.posts).toEqual(mockResponse.data.articles);
      expect(contextValue.totalPages).toBe(1);
      expect(contextValue.error).toBeNull();
    });
  });

  test('handles errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    let contextValue;
    render(
      <BlogProvider>
        <BlogPostContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BlogPostContext.Consumer>
      </BlogProvider>
    );

    await waitFor(() => {
      expect(contextValue.posts).toEqual([]);
      expect(contextValue.error).toBe('An error occurred while fetching the posts.');
    });
  });
});
