/* eslint-disable no-unused-vars */
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc += curr.likes, 0)

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return false
  }

  const f = blogs
    .reduce((acc, curr) => acc.likes < curr.likes ? curr : acc)

  return(
    {
      title: f.title,
      author: f.author,
      likes: f.likes
    }
  )
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return(null)
  }
  const count = (list, obj) => list.filter(element => element === obj).length

  const most = blogs
    .map(e => e.author)
    .reduce((prev, curr, index, array) => (
      count(array, prev) >= count(array, curr) ? prev : curr
    ), null)

  const occurences = count(blogs.map(e => e.author), most)

  return (
    {
      author: most,
      blogs: occurences
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}