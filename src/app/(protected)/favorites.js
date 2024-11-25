import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // Hook para detectar o foco da tela

export default function Favoritos({ route }) {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const isFocused = useIsFocused(); // Detecta se a tela está ativa

  // Recarrega os favoritos sempre que a tela ganha o foco
  useEffect(() => {
    if (isFocused) {
      loadFavoriteBooks();
    }
  }, [isFocused]);

  const loadFavoriteBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem('favorites'); // Carrega os livros dos favoritos
      if (storedBooks) {
        setFavoriteBooks(JSON.parse(storedBooks));
      }
    } catch (error) {
      console.error("Erro ao carregar os livros favoritos", error);
    }
  };

  const removeBookFromFavorites = async (bookToRemove) => {
    Alert.alert(
      "Remover Livro",
      "Você tem certeza que deseja remover este livro dos favoritos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          onPress: async () => {
            try {
              const updatedBooks = favoriteBooks.filter(book => book.title !== bookToRemove.title);
              setFavoriteBooks(updatedBooks); // Atualiza o estado local
              await AsyncStorage.setItem('favorites', JSON.stringify(updatedBooks)); // Atualiza o AsyncStorage
            } catch (error) {
              console.error("Erro ao remover o livro dos favoritos", error);
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.containerheart}>
      {favoriteBooks.length > 0 ? (
        <>
          <Text style={styles.favoriteBooksTitle}>Seus Livros Favoritos:</Text>
          <FlatList
            data={favoriteBooks}
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
                  onPress={() => removeBookFromFavorites(item)}
                >
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.emptyMessage}>
          <Ionicons name="heart-outline" size={100} color="#6A9AB0" />
          <Text style={styles.message}>Você não tem livros favoritos</Text>
          <Text style={styles.subMessage}>Adicione alguns e eles aparecerão aqui!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerheart: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#E9F5FB",
    padding: 20
  },
  favoriteBooksTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6A9AB0',
    marginBottom: 20,
    textAlign: 'center'
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center'
  },
  coverImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 15
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center'
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666'
  },
  removeButton: {
    backgroundColor: '#FF4C4C',
    padding: 8,
    borderRadius: 5,
    marginLeft: 15
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  emptyMessage: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    fontSize: 24,
    color: "#333",
    textAlign: 'center',
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15
  },
  subMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: 'center',
    marginTop: 10
  },
});
