import { combineReducers, createStore } from 'redux'
import { user } from '../User/reducer'

const rootReducer = combineReducers({
  // reducers go here
  user: user
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
