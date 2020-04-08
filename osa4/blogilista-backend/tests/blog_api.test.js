const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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
  test('blogs are returned as json and there is correct amount', async () => {
    const blog = helper.testBlogNoLikes
    const response = await api
      .post('/api/blogs', blog)
    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  })

})

afterAll(() => {
  mongoose.connection.close()
})