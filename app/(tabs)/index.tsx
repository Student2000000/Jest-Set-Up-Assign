import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';



type TodoItem = {
  key: string;
  value: string;
}

const TodoListManager = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (todo.trim()) {
      setTodos([...todos, { key: Date.now().toString(), value: todo }]);
      setTodo('');
    }
  };

  const removeTodo = (key: string) => {
    setTodos(todos.filter((item) => item.key !== key));
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Todo"
        value={todo}
        onChangeText={(text) => setTodo(text)}
        testID="input-todo"
      />
      <Button title="Add Todo" onPress={addTodo} testID="add-todo-button" />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View>
            <Text>{item.value}</Text>
            <Button
              title="Remove"
              onPress={() => removeTodo(item.key)}
              testID={`remove-todo-button-${item.key}`}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TodoListManager;
