import { combineReducers, createStore } from 'redux'
import {  } from './reducers/user'

const rootReducer = combineReducers({
  // reducers go here
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
