import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const logoImg = require("../assets/ryde.png");

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logoImg} style={styles.logo} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Welcome to RydeMe!</Text>
                    <Text style={styles.description}>
                        RydeMe stands out as a commendable transport company known for its dedication to providing reliable and affordable ride-hailing services across various cities. Their user-friendly app interface makes booking rides effortless, ensuring convenience for passengers. RydeMe is also recognized for its commitment to safety, implementing stringent driver screening processes and in-app safety features that prioritize passenger security. Moreover, RydeMe's competitive pricing benefits both riders and drivers, fostering a mutually beneficial environment. Their continuous efforts towards sustainability, including initiatives to reduce emissions and promote electric vehicles, demonstrate their commitment to environmental responsibility. Overall, RydeMe not only enhances urban mobility but also prioritizes safety, affordability, and sustainability, making it a preferred choice for many commuters globally.
                    </Text>
                </View>
                <View style={styles.faqContainer}>
                    <Text style={styles.heading}>FAQs</Text>
                    <Text style={styles.question}>1. How many cedis make a coin?</Text>
                    <Text style={styles.answer}>1 cedi is equal to 10 coins.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logo: {
        width: 350,
        height: 200,
        resizeMode: 'contain',
    },
    textContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        textAlign: 'justify',
    },
    faqContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    answer: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
        lineHeight: 24,
        textAlign: 'justify',
    },
});
