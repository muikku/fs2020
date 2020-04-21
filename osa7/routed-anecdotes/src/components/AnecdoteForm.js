import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {

    const content = useField('content')
    const author = useField('author')
    const info = useField('info')
    const history = useHistory()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      history.push("/")
    }

    const clearFields = () => {
      content.onClick()
      author.onClick()
      info.onClick()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <input type="submit" value="create" />
          <button type="button" onClick={clearFields}>reset</button>
        </form>
        
      </div>
    )
  }

  export default CreateNew