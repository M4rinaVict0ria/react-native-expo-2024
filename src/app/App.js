import React, { useState, createContext, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';

// Criação do contexto do tema
const ThemeContext = createContext();

const themes = {
  light: {
    backgroundColor: '#F5F5F5',
    color: '#333',
  },
  dark: {
    backgroundColor: '#333',
    color: '#F5F5F5',
  },
};

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === themes.light ? themes.dark : themes.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MainComponent />
    </ThemeContext.Provider>
  );
};

const MainComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={[styles.appContainer, { backgroundColor: theme.backgroundColor }]}>
      <Button title="Trocar Tema" onPress={toggleTheme} />
      
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.title, { color: theme.color }]}>Editar Perfil</Text>

        <TextInput
          style={[styles.input, { borderColor: theme.color }]}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { borderColor: theme.color }]}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { borderColor: theme.color }]}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    borderRadius: 5,
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6A9AB0',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default App;
