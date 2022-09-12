import React from 'react';
import {View} from 'react-native';
import TodoHeader from './Components/TodoHeader';
import {Provider} from 'react-redux';
import store from './Redux/store';

const App = () => {
  return (
    <View>
      <Provider store={store}>
        <TodoHeader />
      </Provider>
    </View>
  );
};

export default App;
