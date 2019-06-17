import { combineReducers } from 'redux'
import todos from './todos'
import awards from './awards'
// import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  awards
})

export default todoApp
