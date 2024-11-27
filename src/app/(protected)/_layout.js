import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Text, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../../hooks/Auth/index';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { AuthProvider } from '../../hooks/Auth';


function CustomDrawerContent(props) {
    const { user, signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
        router.replace("signin");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://www.github.com/M4rinaVict0ria.png' }}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>
                    {user?.user?.nome || 'Nome do Usuário'}
                </Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity 
                onPress={handleSignOut}
                style={{
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    padding: 10,
                    backgroundColor: "#6A9AB0",
                }}
            >
                <Text style={{ color: "white" }}>Deslogar</Text>
            </TouchableOpacity>
        </View>
    );
}

const DrawerLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="index"
                    options={{
                        drawerLabel: "Principal",
                        headerTitle: "Principal",
                        drawerIcon: () => <Ionicons name="home-outline" size={20} color="black" />,
                    }} />

                <Drawer.Screen name="favorites"
                    options={{
                        drawerLabel: "Favoritos",
                        headerTitle: "Favoritos",
                        drawerIcon: () => <Ionicons name="heart-outline" size={20} color="black" />,
                    }} />

                <Drawer.Screen name="lidos"
                    options={{
                        drawerLabel: "Lidos",
                        headerTitle: "Lidos",
                        drawerIcon: () => <Ionicons name="battery-full-outline" size={20} color="black" />,
                    }} />

                <Drawer.Screen name="lendo"
                    options={{
                        drawerLabel: "Lendo",
                        headerTitle: "Lendo",
                        drawerIcon: () => <Ionicons name="battery-half-outline" size={20} color="black" />,
                    }} />

                <Drawer.Screen name="ler"
                    options={{
                        drawerLabel: "A ler",
                        headerTitle: "A ler",
                        drawerIcon: () => <Ionicons name="battery-dead-outline" size={20} color="black" />,
                    }} />

                <Drawer.Screen name="addlivros"
                    options={{
                        drawerLabel: "Adicionar Livros",
                        headerTitle: "Adicionar Livros",
                        drawerIcon: () => <Ionicons name="add-outline" size={20} color="black" />,
                    }} />


                <Drawer.Screen name="payment"
                    options={{
                        drawerLabel: "Payment",
                        headerTitle: "Payment",
                        drawerIcon: () => <Ionicons name="wallet-outline" size={20} color="black" />,
                    }} />

                    <Drawer.Screen name="list"
                    options={{
                        drawerLabel: "Listagem",
                        headerTitle: "Listagem",
                        drawerIcon: () => <Ionicons name="list-outline" size={20} color="black" />,
                    }} />
            
            </Drawer>

            
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6A9AB0",
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
    username: {
        textAlign: "center",
        fontSize: 16,
        padding: 10,
        fontFamily: "regular",
        color: "white",
    },
    logoutButton: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        padding: 10,
        backgroundColor: "#6A9AB0",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    logoutText: {
        color: "white",
        fontSize: 16,
    },
});

export default function Layout() {
    return (
        <AuthProvider>
            <DrawerLayout />
        </AuthProvider>
    );
 }