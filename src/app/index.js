import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { BackHandler, Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../hooks/Auth";

export default function App() {
  const { signIn, signOut } = useAuth();

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email: "super@email.com", password: "Super123!" });
      // router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplicativo Pronto para Usar</Text>
      <Button title="Signin Super" onPress={handleEntrarSuper} />

      <Button
        title="Signin Adm"
        onPress={() => signIn({ email: "adm@email.com", password: "adm123!" })}
      />

      <Button
        title="Signin User"
        onPress={() => signIn({ email: "user@email.com", password: "user123!" })}
      />

      <Button title="Sobre" onPress={() => router.push("/about")} />
      <Button
        title="Sair do aplivativo"
        onPress={() => BackHandler.exitApp()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },

  title: {
    fontFamily: "regular",
    color: "Black",
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "black",
    borderStyle: "solid",
    fontFamily: "Roboto",
    
  },

});
