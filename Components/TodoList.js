/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';

const TodoList = props => {
  const showAlert = () =>
    Alert.alert('Delete Todo', 'Are You Sure You Want To Delete Todo', [
      {
        text: 'Yes',
        onPress: props.onDelete.bind(this, props.id),
      },
      {
        text: 'No',
      },
    ]);

  return (
    <Pressable onPress={showAlert}>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <Text style={styles.list}>{props.text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000000',
    padding: 10,
    marginTop: 8,
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TodoList;
