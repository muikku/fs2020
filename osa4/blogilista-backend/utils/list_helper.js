/* eslint-disable no-unused-vars */
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc += curr.likes, 0)


module.exports = {
  dummy,
  totalLikes
}