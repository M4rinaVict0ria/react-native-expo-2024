import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddBook = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Mapeamento entre nome da categoria visível e nome do arquivo
  const categoryMapping = {
    'Favoritos': 'favorites', 
    'Lidos': 'lidos', 
    'Lendo': 'lendo',
    'A Ler': 'ler'
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem('books');
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      }
    } catch (error) {
      console.error("Erro ao carregar os livros", error);
    }
  };

  const saveBooks = async (booksToSave) => {
    try {
      await AsyncStorage.setItem('books', JSON.stringify(booksToSave));
    } catch (error) {
      console.error("Erro ao salvar os livros", error);
    }
  };

  const handleAddBook = () => {
    if (!title || !author || !description || !coverImage) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newBook = { title, author, description, coverImage, expanded: false };

    if (isEditing && editIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = newBook;
      setBooks(updatedBooks);
      saveBooks(updatedBooks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
      saveBooks(updatedBooks);
    }

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
            const updatedBooks = [...books];
            updatedBooks.splice(index, 1);
            setBooks(updatedBooks);
            saveBooks(updatedBooks);
            Alert.alert("Livro Removido", "O livro foi removido com sucesso.");
          }
        },
      ]
    );
  };

  const handleEditBook = (index) => {
    const bookToEdit = books[index];
    setTitle(bookToEdit.title);
    setAuthor(bookToEdit.author);
    setDescription(bookToEdit.description);
    setCoverImage(bookToEdit.coverImage);
    setIsEditing(true);
    setEditIndex(index);
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
      saveBooks(updatedBooks);
      return updatedBooks;
    });
  };

  const addToCategory = async (category, title, author, description, coverImage) => {
    try {
      const newBook = { title, author, description, coverImage };

      const categoryKey = categoryMapping[category]; // Obtém o nome correto do arquivo
      const storedBooks = await AsyncStorage.getItem(categoryKey);
      const booksInCategory = storedBooks ? JSON.parse(storedBooks) : [];

      booksInCategory.push(newBook);

      await AsyncStorage.setItem(categoryKey, JSON.stringify(booksInCategory));

      navigation.navigate(categoryKey);  // Navega para a categoria correta
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o livro à categoria.");
      console.error("Erro ao adicionar o livro à categoria", error);
    }
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
        <Text style={styles.buttonText}>{isEditing ? 'SALVAR' : 'ADICIONAR'}</Text>
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
                    {['Favoritos', 'Lidos', 'Lendo', 'A Ler'].map((category) => (
                      <TouchableOpacity
                        key={category}
                        style={styles.categoryButton}
                        onPress={() => addToCategory(category, item.title, item.author, item.description, item.coverImage)}
                      >
                        <Text style={styles.categoryButtonText}>{category}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEditBook(index)}>
              <Text style={styles.editButtonText}>EDITAR</Text>
            </TouchableOpacity>
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
    marginBottom: 0,
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
  editButton: {
    backgroundColor: '#FFB74D',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default AddBook;