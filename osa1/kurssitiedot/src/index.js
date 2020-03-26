import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {
  const {parts} = props
  return(
    <div>
    {parts.map(part => <Part p={part.name} e={part.exercises}/>)}
    </div>
  )
}

const Part = (props) => (
  <p>{props.p} {props.e}</p>
)

const Total = (props) => {
  const {parts} = props
  return (
    <p>Number of exercises {parts.map(e => e.exercises).reduce((sum, parts) => sum + parts)}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return(
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
