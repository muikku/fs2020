const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(allBlogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token

  // eslint-disable-next-line no-undef
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
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const returnPopulated = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })

  response.json(returnPopulated.toJSON())
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }
  const savedBlog = await (await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }))
    .populate('user', { username: 1, name: 1 })
  response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token

  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if(blog.user.length === 0 || user._id.toString() === blog.user.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'unauthorized' })
  }
})

blogRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    comment: body.comment,
    blogId: blog._id
  })
  console.log('comment : ', comment)
  const savedComment = await comment.save()

  response.json(savedComment.toJSON())
})

blogRouter.get('/all/comments', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments.map(c => c.toJSON()))
})

module.exports = blogRouter

