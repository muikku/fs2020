import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog blog={{ author: 'author', title: 'title', url: 'url', likes: 0 }}
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

})
