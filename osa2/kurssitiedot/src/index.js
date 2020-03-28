import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Content = ({parts}) => 
  <div>
    {parts
      .map(part => 
        <Part 
          key={part.name+part.exercises} 
          p={part.name} 
          e={part.exercises}
        />
      )
    }
  </div>

const Part = ({p, e}) => <p>{p} {e}</p>

/*const Total = ({parts}) => 
  <p>
    Number of exercises {parts
      .map(e => e.exercises)
      .reduce((sum, parts) => sum + parts)}
  </p>
*/

const TotalExercises = ({parts}) => <b>
  total of {
    parts
    .map(e => e.exercises)
    .reduce((prev, curr) => prev + curr)
  } exercises
  </b>

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
      <TotalExercises parts={course.parts}/>
    </div>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }

  return(
    <div>
      <Course course={course}/>
      {/*<Total parts={course.parts}/>*/}
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
