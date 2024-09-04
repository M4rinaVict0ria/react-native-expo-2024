import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { IonIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from '../../hooks/Auth/index';
import { IonIcons } from '@expo/vector-icons';

function CustomDrawerContent(props) {
    const {user, signOut} = useAuth();

    return (
        <View style={{ flex: 1 }}>
            <View 
            style={{
                marginTop: 20, 
                justifyContent: "center",
                alignItems: "center", 
                backgroundColor: "#f0f0f0", 
                paddingVertical: 10,
                }}>
                <image
                source={{
                    uri: 'https://www.github.com/M4rinaVict0ria.png',
                  }}
                  style={{ width: 50, height: 50, borderRadius: 25, alignSelf: "center" }}
                />
                <Text style={{ textAlign: "center", fontSize: 16, padding: 10, fontFamily: "regular" }}>
                {user?.user?.nome}
                </Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity onPress={() => signOut()} 
            style={{ 
            width: '100%', 
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            padding: 10,
            backgroundColor: "#0000ff",
            }}>
                <Text style={{color: "white", fontFamily: "bold"}}>Deslogar</Text>
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
                        drawerIcon: () => <IonIcons name="home-outline" size={20} color="black" />,
                    }} />

                <Drawer.Screen name="list"
                    options={{
                        drawerLabel: "Principal",
                        headerTitle: "Listagem",
                        drawerIcon: () => <IonIcons name="list-circle-outline" size={20} color="black" />,
                    }} />

                <Drawer.Screen name="payment"
                    options={{
                        drawerLabel: "Principal",
                        headerTitle: "Pagamentos",
                        drawerIcon: () => <IonIcons name="diamond-outline" size={20} color="black" />,
                    }} />
            </Drawer>
        </GestureHandlerRootView>
    );
};

export default function Layout() {
    return DrawerLayout();
}