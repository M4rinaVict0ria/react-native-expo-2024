import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { useNavigation } from '@react-navigation/native';

// Corrigindo o caminho para as imagens
import Banner1 from '../assets/Banner/banner1.png';
import Banner2 from '../assets/Banner/banner2.png';
import Banner3 from '../assets/Banner/banner3.png';

import { createStackNavigator } from '@react-navigation/stack';
import AddBook from './(protected)/addlivros';
import Favoritos from './(protected)/favorites'; // Importe a tela Favoritos
import Lidos from './(protected)/lidos';
import Lendo from './(protected)/lendo';
import Ler from './(protected)/ler';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="addlivros" component={AddBook} />
      <Stack.Screen name="favoritos" component={Favoritos} />
      <Stack.Screen name="lidos" component={Lidos} />
      <Stack.Screen name="lendo" component={Lendo} />
      <Stack.Screen name="ler" component={Ler} />
      {/* Adicione outras rotas conforme necessário */}
    </Stack.Navigator>
  );
};




export function Banners() {
    const [page, setPage] = useState(0);
    const navigation = useNavigation();

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };

    return (
        <View style={styles.container}>
            {/* Banners com PagerView */}
            <PagerView
                initialPage={0}
                style={styles.content}
                onPageSelected={onPageSelected}
            >
                <View key="1" style={styles.page}>
                    <Image source={Banner1} style={styles.bannerImage} />
                </View>
                <View key="2" style={styles.page}>
                    <Image source={Banner2} style={styles.bannerImage} />
                </View>
                <View key="3" style={styles.page}>
                    <Image source={Banner3} style={styles.bannerImage} />
                </View>
            </PagerView>

            {/* Indicadores de navegação (Bullets) */}
            <View style={styles.bulletContent}>
                {[0, 1, 2].map((index) => (
                    <View
                        key={index}
                        style={[
                            styles.bullet,
                            page === index && styles.activeBullet,
                        ]}
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
                    <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('favorites')}>
                        <Text style={styles.categoryButtonText}>Favoritos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('lidos')}>
                        <Text style={styles.categoryButtonText}>Lidos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('lendo')}>
                        <Text style={styles.categoryButtonText}>Lendo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('ler')}>
                        <Text style={styles.categoryButtonText}>A Ler</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Botão de Ação para Adicionar um Novo Livro */}
            <View style={styles.ctaContainer}>
                <Text style={styles.ctaText}>Pronto para começar sua jornada literária?</Text>
                <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('addlivros')}>
                    <Text style={styles.ctaButtonText}>Adicionar Novo Livro</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
