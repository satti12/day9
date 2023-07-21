import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { firebase } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection('todos');
  const [textHeading, onChangeTextHeadingText] = useState(route.params.item.heading);
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch(error => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        onChangeText={onChangeTextHeadingText}
        value={textHeading}
        placeholder="Update todo"
      />

      <Pressable style={styles.buttonUpdate} onPress={updateTodo}>
        <Text>UPDATE TODO</Text>
      </Pressable>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: 15,
    marginRight: 1,
  },
  textfield: {
    marginBottom: 10,
    padding: 15,
    fontSize: 10,
    color: '#000000',
    backgroundColor: 'reactDom',
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#0de065',
  },
});
