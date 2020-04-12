const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../App')
const api = supertest(app)
const mongoose = require('mongoose')

describe('when there is intially one user @ db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('w3stwordaddict', 10)
    const user = new User({ username: 'notroot', passwordHash })
    await user.save()
  })

  test('creating new adds length to usersdb and username can be found', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Fassbender',
      name: 'Sebastian Shaw',
      password: 'Str0ng3st!EwerP5w0rd'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('correct statuscode and error is given when username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = helper.newUser('notroot', 'lul', 'salesana')
    console.log('new user ', newUser)
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})


afterAll(() => {
  mongoose.connection.close()
})