import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de que a biblioteca está instalada


export default function Favorites() {
    return (
        <View style={styles.container}>
            <Ionicons name="heart-outline" size={100} color="#6A9AB0" />
            <Text style={styles.message}>Você não tem livros favoritos</Text>
            <Text style={styles.subMessage}>Adicione alguns e eles aparecerão aqui!</Text>
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
