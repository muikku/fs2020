const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('w3stwordaddict', 10)
  const user = new User({ username: 'notroot', passwordHash })
  await user.save()
  const login = await api
    .post('/api/login')
    .send({
      username: 'notroot',
      password: 'w3stwordaddict'
    })
  token = `bearer ${login.body.token}`
})

describe('HTTP GET BLOGS', () => {
  test('blogs are returned as json and there is correct amount', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog object has property id', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('HTTP POST BLOGS', () => {
  test('correct amount of blogs at db after post and contains specific blog title', async () => {
    const blog = helper.testBlogNoLikes()
    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: token })
    const blogsNow = await helper.blogsInDd()
    expect(blogsNow.length).toBe(helper.initialBlogs.length + 1)
    expect(blogsNow.map(b => b.title)).toContain(helper.testBlogNoLikes().title)
  })

  test('if likes has no value, its value becomes 0', async () => {
    const blog = helper.testBlogNoLikes()
    const response = await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: token })
    expect(response.body.likes).toBe(0)
  })

  test('if title is undef, return 400 bad request', async () => {
    const blog = new Blog({ author: 'Tiina Jylhä', url:'https://suomenkuvalehti.fi/jutut/kotimaa/valtio-osti-kiinalaiset-hengityssuojat-ulosottovelkaiselta-liikemiehelta-tiina-jylha-sanoo-miljoonakaupan-kuuluneen-itselleen/' })
    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: token })
      .expect(400)
  })

  test('if url is undef, return 400 bad request', async () => {
    const blog = new Blog({ author: 'Tiina Jylhä', title: 'kyörä' })
    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: token })
      .expect(400)
  })

  test('if token is undef, return 401 Unauthorized', async () => {
    const blog = new Blog({ author: 'Tiina Jylhä', title: 'kyörä' })
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  })

})

afterAll(() => {
  mongoose.connection.close()
})