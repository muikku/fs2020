import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({handler, text}) => <button onClick={handler}>{text}</button>
const Stats = ({good, neutral, bad}) => {
  return(
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (state, setState) => () => setState(state + 1)
  
  return (
    <div>
      <Header text="give feedback"/>
      <Button handler={handleClick(good, setGood)} text="good" />
      <Button handler={handleClick(neutral, setNeutral)} text="neutral" />
      <Button handler={handleClick(bad, setBad)} text="bad" />
      <Header text="statistics"/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)