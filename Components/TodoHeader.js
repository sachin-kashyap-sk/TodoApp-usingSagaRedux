/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  GET_TODOS_REQUESTED,
  DELETE_TODO_REQUESTED,
  SET_TODO_TITLE_REQUESTED,
  CREATE_TODO_REQUESTED,
} from '../Redux/actions/todo-action';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import TodoList from './TodoList';

const TodoHeader = ({
  todo: {loading, todos},
  getTodos,
  deleteTodo,
  title,
  setTodoTitle,
  createTodo,
}) => {
  const [enterText, setEnterText] = useState({
    isValidDigit: true,
  });

  useEffect(() => {
    // getData();
    getTodos();
    // eslint-disable-next-line
  }, []);

  async function addHandler() {
    if (title.trim().length <= 7) {
      setEnterText({
        isValidDigit: false,
      });
      Alert.alert('Todo Is Not There', 'Please Enter Your Todo First', [
        {text: 'okay'},
      ]);
      return;
    } else {
      setEnterText({
        isValidDigit: true,
      });
      createTodo(title);
    }
  }

  async function DeleteHandler(id) {
    deleteTodo(id);
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.todo}>Todo App</Text>
      </View>

      <View style={styles.container}>
        <TextInput
          // onChangeText={e => textInputChange(e)}
          onChangeText={e => {
            setTodoTitle(e);
          }}
          style={styles.input}
          placeholder="Add your Todo"
          placeholderTextColor={'#000000'}
          value={title}
          // onEndEditing={e => handleValidInput(e.nativeEvent.text)}
        />

        {enterText.isValidDigit ? null : (
          <View>
            <Text style={{fontSize: 14, fontWeight: '700', color: 'red'}}>
              Input must be 7 characters long
            </Text>
          </View>
        )}
      </View>

      <View style={{padding: 10, width: '50%'}}>
        <Button onPress={addHandler} title="Add" color="#000" />
      </View>

      {loading && (
        <View style={{padding: 10}}>
          <Text style={{color: '#000000', fontSize: 16, fontWeight: '800'}}>
            LOADING...
          </Text>
        </View>
      )}

      {todos && (
        <FlatList
          data={todos}
          renderItem={itemData => {
            return (
              <TodoList
                text={itemData.item.title}
                id={itemData.item._id}
                onDelete={DeleteHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  todo: {
    fontSize: 40,
    fontWeight: '700',
    color: '#666',
  },

  input: {
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    fontSize: 20,
  },

  container: {
    padding: 10,
  },

  Main: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#000',
  },
});

TodoHeader.propTypes = {
  loading: PropTypes.bool,
  todos: PropTypes.array,
  getTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  title: PropTypes.string,
  setTodoTitle: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
};

// Get state to props
const mapStateToProps = state => ({
  todo: state.todo,
  title: state.todo.title,
});

// Get dispatch / function to props
const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch({type: GET_TODOS_REQUESTED}),
  deleteTodo: id => dispatch({type: DELETE_TODO_REQUESTED, payload: id}),
  setTodoTitle: title =>
    dispatch({type: SET_TODO_TITLE_REQUESTED, payload: title}),
  createTodo: title => dispatch({type: CREATE_TODO_REQUESTED, payload: title}),
});

// To make those two function works register it using connect
export default connect(mapStateToProps, mapDispatchToProps)(TodoHeader);
