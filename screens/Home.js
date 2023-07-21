import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import firebase from '../firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('todos');
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = todoRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const todos = [];
        querySnapshot.forEach(doc => {
          const { heading } = doc.data();
          todos.push({
            id: doc.id,
            heading,
          });
        });
        setTodos(todos);
      });

    return () => unsubscribe();
  }, []);

  const deleteTodo = (todo) => {
    todoRef
      .doc(todo.id)
      .delete()
      .then(() => {
        alert("Deleted successfully");
      })
      .catch(error => {
        alert(error);
      });
  };

  const addTodo = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss();
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a todo"
        placeholderTextColor="#aaaaaa"
        onChangeText={heading => setAddData(heading)}
        value={addData}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Pressable
              style={styles.todoItem}
              onPress={() => navigation.navigate('Detail', { item })}
            >
              <FontAwesome
                name="gfgghn"
                color="red"
                onPress={() => deleteTodo(item)}
                style={styles.todoIcon}
              />
              <View>
                <Text style={styles.innerContainer}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20, // Add padding to the top of the container
    },
    input: {
      height: 40,
      margin: 12,
      marginTop: 20, // Add margin from the top
      borderWidth: 1,
      padding: 10,
    },
    button: {
      backgroundColor: 'blue', // Change the button color to blue
      padding: 10,
      alignItems: 'center',
      margin: 12,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    todoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      paddingHorizontal: 10,
    },
    todoIcon: {
      marginRight: 10,
    },
    innerContainer: {
      fontSize: 16,
    },
  });
  


export default Home;
