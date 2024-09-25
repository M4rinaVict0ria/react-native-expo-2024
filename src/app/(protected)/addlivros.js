import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        {
          text: "Remover", onPress: () => {
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
      
      <TouchableOpacity style={styles.button} onPress={handleAddBook}>
        <Text style={styles.buttonText}>ADICIONAR</Text>
      </TouchableOpacity>
      
      <FlatList
        data={favoriteBooks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookText}>
              {item.title} - {item.author}
            </Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveBook(index)}>
              <Text style={styles.removeButtonText}>REMOVER</Text>
            </TouchableOpacity>
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
    backgroundColor: '#F5F5F5', // Fundo claro para o container
  },
  input: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // Fundo branco para os inputs
    borderRadius: 5,
    shadowColor: '#000', // Sombra para dar profundidade
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Sombra para Android
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', // Fundo branco para os itens da lista
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  bookText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6A9AB0',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase', // Maiúsculas para o texto do botão
  },
  removeButton: {
    backgroundColor: '#FF4C4C', // Cor para o botão de remover
    borderRadius: 5,
    padding: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Favorites;
