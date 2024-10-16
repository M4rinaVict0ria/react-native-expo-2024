import { router } from "expo-router";
import { Button, Text, View, Image, StyleSheet } from "react-native";

export default function About() {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.description}>
                Luma é uma ferramenta projetada para leitores que desejam gerenciar suas coleções de livros com facilidade, tanto no formato físico quanto digital. Ele oferece uma experiência completa para organizar, acompanhar e explorar leituras de forma prática e interativa.
            </Text>
            <View style={styles.buttonContainer}>
                <Button title="Voltar" onPress={() => router.back()} color="#6A9AB0" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E9F5FB", // Fundo suave
        padding: 20,
    },
    logo: {
        width: 200,
        height: 200,
        position: "absolute",
        top: 50,
    },
    description: {
        fontFamily: "regular",
        fontSize: 18,
        color: "#333",
        margin: 20,
        textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonContainer: {
        marginTop: 20,
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#6A9AB0",
    },
});

