import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const increment = (string) => () => {
    store.dispatch({
      type: string
    })
  }

  const getState = (string) => {
    switch(string){
      case 'GOOD':
        return store.getState().good
        case 'OK':
        return store.getState().ok
        case 'BAD':
        return store.getState().bad
        default:
        return store.getState()
    }
  }

  return (
    <div>
      <button onClick={increment('GOOD')}>good</button> 
      <button onClick={increment('OK')}>neutral</button> 
      <button onClick={increment('BAD')}>bad</button>
      <button onClick={increment('ZERO')}>reset stats</button>
      <div>good {getState('GOOD')}</div>
      <div>neutral {getState('OK')}</div>
      <div>bad {getState('BAD')}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
