import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SeachContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export const CustomHeader = ({ navigation, route }: any) => {
    const { searchQuery, setSearchQuery } = useSearch();
    const { user } = useAuth();
    const router = useRouter();

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: route.name !== 'search' ? 'space-between' : 'flex-start',
            height: 60,
            backgroundColor: 'white',
            gap: 15,
            paddingHorizontal: 10
        }}>
            <TouchableOpacity onPress={() => {
                router.push({
                    pathname: "/(stack)/profile",
                })
            }}>
                <View style={style.divContainerImage}>
                    <Image
                        style={style.profile}
                        source={require('../assets/images/icon.png')}
                    />
                </View>
            </TouchableOpacity>
            {route.name === 'search' ? (
                <TextInput
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    style={{
                        flex: 1,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 28,
                        backgroundColor: '#E7ECF0',
                        textAlign: 'center'
                    }}
                />
            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#3b3b3b' }}>{user.nome}</Text>
                </View>
            )}
            <Feather
                name="settings"
                size={22}
                onPress={() =>
                    router.push({
                        pathname: "/(stack)/settings",
                    })
                }
            />
        </View>
    );
};

const style = StyleSheet.create({
    divContainerImage: {
        display: 'flex',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    profile: {
        borderRadius: 50,
        height: 50,
        width: 50,
    }
});