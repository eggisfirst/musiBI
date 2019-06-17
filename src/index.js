import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './App'
import { HashRouter } from 'react-router-dom'

// import './css/normalize.css'
// import './css/index.css'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>, document.getElementById('root'))
