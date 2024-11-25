import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // Importando o hook

export default function Lidos() {
  const [readBooks, setReadBooks] = useState([]);
  const isFocused = useIsFocused(); // Detecta o foco da tela

  // Carrega os livros ao ganhar foco
  useEffect(() => {
    if (isFocused) {
      loadReadBooks();
    }
  }, [isFocused]);

  const loadReadBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem('lidos'); // Carregar livros lidos
      if (storedBooks) {
        setReadBooks(JSON.parse(storedBooks)); // Atualiza o estado com os livros lidos
      }
    } catch (error) {
      console.error("Erro ao carregar os livros lidos", error);
    }
  };

  const removeBookFromRead = async (bookToRemove) => {
    Alert.alert(
      "Remover Livro",
      "Você tem certeza que deseja remover este livro da lista de lidos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover", onPress: async () => {
            try {
              const updatedBooks = readBooks.filter(book => book.title !== bookToRemove.title);
              setReadBooks(updatedBooks); // Atualiza o estado local
              await AsyncStorage.setItem('lidos', JSON.stringify(updatedBooks)); // Atualiza o AsyncStorage
            } catch (error) {
              console.error("Erro ao remover o livro dos lidos", error);
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {readBooks.length > 0 ? (
        <>
          <Text style={styles.readBooksTitle}>Seus Livros Lidos:</Text>
          <FlatList
            data={readBooks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.bookCard}>
                <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
                <View style={styles.bookDetails}>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.bookAuthor}>{item.author}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeBookFromRead(item)}
                >
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.emptyMessage}>
          <Ionicons name="book-outline" size={100} color="#6A9AB0" />
          <Text style={styles.message}>Você ainda não marcou livros como lidos</Text>
          <Text style={styles.subMessage}>Adicione livros à sua lista de leitura para marcar como lidos!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#E9F5FB",
    padding: 20,
  },
  readBooksTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6A9AB0', // Cor harmonizada com a paleta do app
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },

  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    width: '95%',
  },
  coverImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 15,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#FF4C4C',
    padding: 8,
    borderRadius: 5,
    marginLeft: 15,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  emptyMessage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontFamily: "regular",
    fontSize: 24,
    color: "#333",
    textAlign: 'center',
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  subMessage: {
    fontFamily: "regular",
    fontSize: 16,
    color: "#666",
    textAlign: 'center',
    marginTop: 10,
  },
});
