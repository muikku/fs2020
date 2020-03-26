import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {
  const {part1, part2, part3} = props
  return(
    <div>
    <Part p={part1.name} e={part1.exercises}/>
    <Part p={part2.name} e={part2.exercises}/>
    <Part p={part3.name} e={part3.exercises}/>
    </div>
  )
}

const Part = (props) => (
  <p>{props.p} {props.e}</p>
)

const Total = (props) => {
  const {part1, part2, part3} = props
  return (
    <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return(
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
