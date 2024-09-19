import PagerView from "react-native-pager-view";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { useState } from "react";
import { Image } from "react-native";


export function Banner() {
    const [page, setPage] = useState(0);

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);

    };
    
    return (
        <View style={styles.container}>
            <PagerView initialPage={0} style={styles.content} onPageSelected={onPageSelected}>
                <View key="1" style={styles.page}>
                <Image source={require('../../assets/banner1.png')} style={{width: "90%", height: "148%" }} />
                </View>
                <View key="2" style={styles.page}>
                <Image source={require('../../assets/banner2.png')} style={{width: "75%", height: "122%" }}/>
                </View>
                <View key="3" style={styles.page}>
                <Image source={require('../../assets/banner3.png')} style={{width: "80%", height: "120%" }}/>
                </View>
            </PagerView>
            <View style={styles.bulletContent}>
                <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginTop: 10,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 10,

    },
    bulletContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#999",
        margin: 10,
    },
    activeBullet: {
        backgroundColor: "#000",
    },
    text: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
    },
});