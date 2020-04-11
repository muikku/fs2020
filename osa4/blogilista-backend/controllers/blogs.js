/* eslint-disable no-undef */
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(allBlogs.map(blog => blog.toJSON()))
})


blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  console.log('this is token', token)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  /* onko tämä turha?
  await savedBlog.populate('user', { username: 1, name: 1, id: 1 }) */
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter

