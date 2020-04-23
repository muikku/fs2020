import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let createBlog = jest.fn()
  let component
  beforeEach(() => {
    component = render(
      <BlogForm
        createBlog={createBlog}
      />
    )
  })

  test('form submit recalls createblog func with correct data', () => {
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(author, {
      target: { value: 'this is author' }
    })
    fireEvent.change(title, {
      target: { value: 'this is title' }
    })
    fireEvent.change(url, {
      target: { value: 'this is url' }
    })
    fireEvent.submit(form)
    expect(createBlog.mock.calls).toEqual([[{ 'author': 'this is author', 'title': 'this is title', 'url': 'this is url' }]])
  })
})
