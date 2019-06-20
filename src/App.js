import React, { Component } from 'react'
import Routes from './routes'
// import {flexible_css} from './assets/js/flexible_css'
// import {flexible} from './assets/js/flexible'
// // flexible_css()
// flexible()
import './css/normalize.css'
import './css/main.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    // console.log('mangoguang', this)
  }
  render () {
    return (
      <div>
        <Routes></Routes>
      </div>
    )
  }
}

export default App
