/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

// Reducers
import todo from './todo-reducer';

export default combineReducers({
  todo,
  // Here you can registering another reducers.
});
