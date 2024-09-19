import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';

const Favorites = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const handleAddBook = () => {
    if (!title || !author) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setFavoriteBooks((currentBooks) => [...currentBooks, { title, author }]);
    setTitle('');
    setAuthor('');
  };

  const handleRemoveBook = (index) => {
    Alert.alert(
      "Remover Livro",
      "Você tem certeza que deseja remover este livro?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => {
            setFavoriteBooks((currentBooks) => {
              const updatedBooks = [...currentBooks];
              updatedBooks.splice(index, 1);
              return updatedBooks;
            });
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título do Livro"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor do Livro"
        value={author}
        onChangeText={setAuthor}
      />
      <Button style={styles.button} title="Adicionar Livro" onPress={handleAddBook} />

      <FlatList
        data={favoriteBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookText}>
              {item.title} - {item.author}
            </Text>
            <Button title="Remover" onPress={() => handleRemoveBook(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#0000ff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#0000ff',
    borderBottomWidth: 1,
  },
  bookText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0000ff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
});

export default Favorites;
