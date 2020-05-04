const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(!(body.password)){
    return response.status(401).json({ error: 'password missing' })
  }

  if(!(body.password.length >=3)){
    return response.status(401).json({ error: 'password too short, minimum length is 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.delete('/:id', async (request, response) => {
  const token = request.token
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const targetedUser = await User.findById(request.params.id)
  if(user._id.toString() === targetedUser._id.toString()){
    if(user.blogs.length > 0){
      user.blogs.forEach(b => {
        console.log('blog?: ',b)
        Blog.findByIdAndRemove(b.id)
      })
    }
    await User.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'unauthorized' })
  }
})

module.exports = usersRouter