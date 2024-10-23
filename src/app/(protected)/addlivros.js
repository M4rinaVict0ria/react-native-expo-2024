import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const AddBook = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [books, setBooks] = useState([]);

  const handleAddBook = () => {
    if (!title || !author || !description || !coverImage) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setBooks((currentBooks) => [
      ...currentBooks,
      { title, author, description, coverImage, expanded: false },
    ]);
    setTitle('');
    setAuthor('');
    setDescription('');
    setCoverImage('');
  };

  const handleRemoveBook = (index) => {
    Alert.alert(
      "Remover Livro",
      "Você tem certeza que deseja remover este livro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover", onPress: () => {
            setBooks((currentBooks) => {
              const updatedBooks = [...currentBooks];
              updatedBooks.splice(index, 1);
              return updatedBooks;
            });
            Alert.alert("Livro Removido", "O livro foi removido com sucesso.");
          }
        },
      ]
    );
  };

  

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à galeria.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setCoverImage(pickerResult.assets[0].uri);
    }
  };

  const toggleExpand = (index) => {
    setBooks((currentBooks) => {
      const updatedBooks = [...currentBooks];
      updatedBooks[index].expanded = !updatedBooks[index].expanded;
      return updatedBooks;
    });
  };

  const addToCategory = (category) => {
    const newBook = { title, author, description, coverImage };
    navigation.navigate(category, { book: newBook });
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
      <TextInput
        style={styles.input}
        placeholder="Descrição do Livro"
        value={description}
        onChangeText={setDescription}
      />
      
      <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
        <Text style={styles.imageButtonText}>Selecionar Capa do Livro</Text>
      </TouchableOpacity>
      
      {coverImage ? (
        <Image source={{ uri: coverImage }} style={styles.coverImagePreview} />
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleAddBook}>
        <Text style={styles.buttonText}>ADICIONAR</Text>
      </TouchableOpacity>
      
      <FlatList
        data={books}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
            <View style={styles.bookDetails}>
              <Text style={styles.bookText}>{item.title} - {item.author}</Text>
              <TouchableOpacity onPress={() => toggleExpand(index)}>
                <Text style={styles.toggleText}>{item.expanded ? 'Menos Informações' : 'Mais Informações'}</Text>
              </TouchableOpacity>
              {item.expanded && (
                <View style={styles.expandedInfo}>
                  <Text style={styles.descriptionText}>{item.description}</Text>
                  <View style={styles.categoryButtons}>
                    {['Favorites', 'Lidos', 'Lendo', 'A Ler'].map((category) => (
                      <TouchableOpacity
                        key={category}
                        style={styles.categoryButton}
                        onPress={() => addToCategory(category)}
                      >
                        <Text style={styles.categoryButtonText}>{category}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
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
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  imageButton: {
    backgroundColor: '#6A9AB0',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  coverImagePreview: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  coverImage: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
  },
  bookText: {
    fontSize: 16,
  },
  toggleText: {
    color: '#6A9AB0',
    fontWeight: 'bold',
  },
  expandedInfo: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  categoryButton: {
    backgroundColor: '#6A9AB0',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6A9AB0',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#FF4C4C',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default AddBook;
