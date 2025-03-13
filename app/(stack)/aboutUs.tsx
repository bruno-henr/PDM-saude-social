import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, ScrollView } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import { Container } from './styles';

const AboutUs: React.FC = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require("../../assets/images/react-logo.png")} style={styles.logo} />
            </View>

            {/* Título e Descrição */}
            <Text style={styles.title}>Saúde Social</Text>
            <Text style={styles.subtitle}>Conectando médicos, fortalecendo a medicina</Text>

            <Text style={styles.content}>
                Bem-vindo ao **Saúde Social**, a primeira rede social exclusiva para médicos!
                Criamos um espaço seguro e inovador para compartilhar conhecimentos, discutir casos clínicos,
                fazer networking e acompanhar as últimas tendências da medicina.
                {"\n\n"}
                Aqui, você pode interagir com profissionais da área, fortalecer sua carreira e contribuir para uma
                comunidade médica mais unida e colaborativa. Junte-se a nós nessa jornada de evolução e aprendizado!
            </Text>

            {/* Botão de Voltar */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#F4F6F9",
        padding: 20,
        alignItems: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2C3E50",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#34495E",
        textAlign: "center",
        marginBottom: 20,
    },
    content: {
        fontSize: 14,
        color: "#555",
        lineHeight: 22,
        textAlign: "justify",
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AboutUs;