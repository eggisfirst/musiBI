import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './App'
import { HashRouter } from 'react-router-dom'

// import './css/normalize.css'
// import './css/index.css'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(todoApp)

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>, document.getElementById('root'))
registerServiceWorker()
