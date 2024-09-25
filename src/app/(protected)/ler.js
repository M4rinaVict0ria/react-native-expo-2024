import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de que a biblioteca está instalada

export default function Lidos() {
    return (
        <View style={styles.container}>
            <Ionicons name="book-outline" size={100} color="#6A9AB0" />
            <Text style={styles.message}>Você não tem nenhum livro pendente</Text>
            <Text style={styles.subMessage}>Explore novos livros para começar sua leitura!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#E9F5FB", // Fundo suave
        padding: 20,
    },
    message: {
        fontFamily: "regular", // Ajuste conforme necessário
        fontSize: 24,
        color: "#333", // Tom de cinza escuro
        textAlign: 'center',
        backgroundColor: "#fff", // Fundo branco
        borderRadius: 8,
        padding: 15,
        shadowColor: "#000", // Sombra para destaque
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
        fontFamily: "regular", // Ajuste conforme necessário
        fontSize: 16,
        color: "#666", // Tom de cinza claro
        textAlign: 'center',
        marginTop: 10,
    },
});
