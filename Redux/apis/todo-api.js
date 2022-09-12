/* eslint-disable prettier/prettier */
import defaultAxios from 'axios';

const axios = defaultAxios.create({
  baseURL: 'http://10.0.2.2:3000/api',
  headers: {'Content-Type': 'application/json'},
});

// Get All Todos
export const getAllTodos = async () => {
  try {
    const todos = await axios.get('get-All');

    return todos.data.todo;
  } catch (err) {
    return console.error(err);
  }
};

// Create New Todo
export const createNewTodo = async title => {
  try {
    const todo = await axios.post('add', {
      title,
    });
    return todo.data;
  } catch (err) {
    return console.error(err);
  }
};

// Delete existed todo
export const deleteExistedTodo = async id => {
  try {
    await axios.delete(`delete/${id}`);

    return id;
  } catch (err) {
    return console.error(err);
  }
};
