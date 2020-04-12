/* eslint-disable no-unused-vars */
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc += curr.likes, 0)

const countEquals = (list, obj) => list.filter(element => element === obj).length

const countLikes = (list, author) => totalLikes(list.filter(e => e.author === author))

const empty = (list) => list.length === 0


const favoriteBlog = (blogs) => {
  if(empty(blogs)){
    return undefined
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
  if(empty(blogs)){
    return undefined
  }
  const most = blogs
    .map(e => e.author)
    .reduce((prev, curr, index, array) => (
      countEquals(array, prev) >= countEquals(array, curr) ? prev : curr
    ))
  const occurences = countEquals(blogs.map(e => e.author), most)
  return (
    {
      author: most,
      blogs: occurences
    }
  )
}

const mostLikes = (blogs) => {
  if(empty(blogs)){
    return undefined
  }
  const most = blogs
    .reduce((prev, curr, index, array) => (
      countLikes(array, prev.author) >= countLikes(array, curr.author) ? prev : curr
    ))
  const occurences = countLikes(blogs, most.author)
  return (
    {
      author: most.author,
      likes: occurences
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}