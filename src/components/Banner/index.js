import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import PagerView from "react-native-pager-view";
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação

export function Banner() {
  const [page, setPage] = useState(0);
  const navigation = useNavigation(); // Hook para navegação

  const onPageSelected = (e) => {
    setPage(e.nativeEvent.position);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Banners com PagerView */}
        <PagerView
          initialPage={0}
          style={styles.content}
          onPageSelected={onPageSelected}
        >
          {/* Banner 1 */}
          <View key="1" style={styles.page}>
            <Image
              source={require('../../assets/Banner/banner1.png')}
              style={styles.bannerImage}
            />
          </View>

          {/* Banner 2 */}
          <View key="2" style={styles.page}>
            <Image
              source={require('../../assets/Banner/banner2.png')}
              style={styles.bannerImage}
            />
          </View>

          {/* Banner 3 */}
          <View key="3" style={styles.page}>
            <Image
              source={require('../../assets/Banner/banner3.png')}
              style={styles.bannerImage}
            />
          </View>
        </PagerView>

        {/* Indicadores de navegação (Bullets) */}
        <View style={styles.bulletContent}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[styles.bullet, page === index && styles.activeBullet]}
            />
          ))}
        </View>

        {/* Introdução / Texto de Boas-vindas */}
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Bem-vindo à nossa Biblioteca Virtual!</Text>
          <Text style={styles.introText}>
            Descubra novos mundos, organize suas leituras e encontre seus livros favoritos.
          </Text>
        </View>

        {/* Seção de Categorias */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Explore nossas categorias:</Text>
          <View style={styles.categoryList}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate('favorites')} // Navegar para a tela de Favoritos
            >
              <Text style={styles.categoryButtonText}>Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate('lidos')} // Navegar para a tela de Lidos
            >
              <Text style={styles.categoryButtonText}>Lidos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate('lendo')} // Navegar para a tela de Lendo
            >
              <Text style={styles.categoryButtonText}>Lendo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate('ler')} // Navegar para a tela de A Ler
            >
              <Text style={styles.categoryButtonText}>A Ler</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Ação para Adicionar um Novo Livro */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaText}>Pronto para começar sua jornada literária?</Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('addlivros')} // Navegar para a tela de Adicionar Livro
          >
            <Text style={styles.ctaButtonText}>Adicionar Novo Livro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    height: 200,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bulletContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#999",
    margin: 5,
  },
  activeBullet: {
    backgroundColor: "#000",
  },
  introContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    marginTop: 20,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  introText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  categoriesContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  categoriesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: '#6A9AB0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ctaContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ctaButton: {
    marginTop: 20,
    backgroundColor: '#6A9AB0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
