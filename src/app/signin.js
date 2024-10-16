import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Alert, BackHandler, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useAuth } from "../hooks/Auth";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image } from "react-native";


export default function App() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("super@email.com");
  const [password, setPassword] = useState("A123456a!");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleLogin = async () => {
    try {
      await signIn({ email, password });
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={{ width: 200, height: 200, top: 20, position: "absolute" }} />
      <Text style={styles.title}>LUMA BOOKS</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <View style={styles.inputBox}>
        <Ionicons name="mail-open-outline" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisibility}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => router.push("/about")}>
        <Text style={styles.linkText}>Sobre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => {
        Alert.alert("Sair", "Você tem certeza que deseja sair?", [
          { text: "Cancelar", style: "cancel" },
          { text: "Sair", onPress: () => BackHandler.exitApp() },
        ]);
      }}>
        <Text style={styles.linkText}>Sair do aplicativo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecef",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  title: {
    fontFamily: "regular",
    fontSize: 26,
    marginBottom: 30,
    color: "#343a40",
    textAlign: "center",
    backgroundColor: "#6A9AB0",
    borderRadius: 5,
    borderWidth: 1,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
    width: "100%",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontFamily: "regular",
    fontSize: 18,
    paddingVertical: 5,
    color: "#343a40",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#6A9AB0",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginVertical: 5,
  },
  linkText: {
    color: "#007bff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
