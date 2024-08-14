import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/Auth';
import { router } from 'expo-router';


export default function App() {
  const { SignIn, SignOut } = useAuth();

  const handleEntrarSuper = async () => {
    try {
      await SignIn({ email: "super@email.com", password: "Super123!." });
      router.replace("/");
    } catch (error) {
      console.log(e);
      }
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Primeira janela</Text>

      <Button title='Entrar Super' onPress={handleEntrarSuper} />

      <Button
       title="Signin Adm" 
       onPress={()=> SignIn({email: "adm@email.com", password: "Adm123!"})
        }
      />
      <Button
       title="SignIn User" 
       onPress={()=> SignIn({email: "user@email.com", password: "User123!"})
        }
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
