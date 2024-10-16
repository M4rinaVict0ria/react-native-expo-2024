import React, { useState, createContext, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { theme } = useContext(ThemeContext);

  return (
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
  );
};

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === themes.light ? themes.dark : themes.light));
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      <View style={[styles.appContainer, { backgroundColor: theme.backgroundColor }]}>
        <TouchableOpacity style={styles.tema} onPress={toggleTheme}>
          <Text style={styles.buttonTema}>
            {theme === themes.light ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
        <EditProfile />
      </View>
    </ThemeContext.Provider>
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
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6A9AB0',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  tema: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6A9AB0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    right: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  buttonTema: {
    fontSize: 24,
    color: 'white',
  },
});

export default App;
