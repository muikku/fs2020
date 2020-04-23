import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let mockHandler = jest.fn()
  let component
  beforeEach(() => {
    component = render(
      <Blog
        blog={{ author: 'author', title: 'title', url: 'url', likes: 0 }}
        handleLike={mockHandler}
      />
    )
  })

  test('minimized blog renders blog title and author, but not url or likes', () => {
    const mini = component.container.querySelector('.minimized')
    expect(mini).toHaveTextContent('author')
    expect(mini).toHaveTextContent('title')
    expect(mini).not.toHaveTextContent('url')
    expect(mini).not.toHaveTextContent('0')
  })

  test('when blog is clicked, its shows likes and url', () => {
    const button = component.container.querySelector('.minimized')
    fireEvent.click(button)
    const mini = component.container.querySelector('.maximized')
    expect(mini).toHaveTextContent('url')
    expect(mini).toHaveTextContent('0')
  })

  test('when like button is clicked twise, eventhandler is called twise', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
