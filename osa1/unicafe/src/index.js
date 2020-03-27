import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({handler, text}) => <button onClick={handler}>{text}</button>
const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positivePercent = good / sum * 100
  if(sum === 0){
    return (
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {sum}</div>
      <div>average {average}</div>
      <div>positive {positivePercent} % </div>
      <div></div>
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)