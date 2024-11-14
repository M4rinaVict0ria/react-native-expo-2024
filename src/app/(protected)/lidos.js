import { Text, View, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';  // Para acessar os parâmetros passados
import { Ionicons } from '@expo/vector-icons'; 

export default function Lidos() {
  const route = useRoute();
  const book = route.params?.book;  // Acessando o livro passado via navegação

  return (
    <View style={styles.container}>
      <Ionicons name="book-outline" size={100} color="#6A9AB0" />
      {book ? (
        <>
          <Text style={styles.message}>Livro: {book.title}</Text>
          <Text style={styles.subMessage}>{book.author}</Text>
          <Text style={styles.subMessage}>{book.description}</Text>
        </>
      ) : (
        <Text style={styles.message}>Você não tem nenhum livro pendente</Text>
      )}
      <Text style={styles.subMessage}>Explore novos livros para começar sua leitura!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#E9F5FB", 
    padding: 20,
  },
  message: {
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
    fontSize: 16,
    color: "#666", 
    textAlign: 'center',
    marginTop: 10,
  },
});
