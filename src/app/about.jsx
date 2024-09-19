import { router } from "expo-router";
import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";


export default function About() {
    return (
       <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Image source={require("../assets/logo.png")} style={{width: 200, height: 200, top: 20, position: "absolute"}} />
        <Text style={styles.stylescontainer}>Luma é uma ferramenta projetada para leitores que desejam gerenciar suas coleções de livros com facilidade, tanto no formato físico quanto digital. Ele oferece uma experiência completa para organizar, acompanhar e explorar leituras de forma prática e interativa</Text>
        <Button style={styles.stylesbutton} title="Voltar" onPress={()=> {router.replace("/")}} />
       </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    stylescontainer: {
        fontFamily: "regular",
        fontSize: 20,
        color: "black",
        margin: 10,
        textAlign: "center",
        textShadowColor: "black",
        position : "relative",
        bottom: 50,
        
    },
    stylesbutton: {
        width: "100%",
        margin: 10,
        bottom: 0,
        borderRadius: 5,
        backgroundColor: "#0000ff",
        color: "white",
        padding: 10,
        textAlign: "center",
        fontFamily: "regular",
    }
    
});