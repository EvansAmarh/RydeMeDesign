import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button, Text } from 'react-native-elements';
import { validateUsername, validatePassword } from '../utils/validation';
import { ImageBackground } from 'react-native';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true);

        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);

        if (usernameError || passwordError) {
            setErrors({ username: usernameError, password: passwordError });
            setLoading(false);
            return;
        }

        const existingUser = await AsyncStorage.getItem(username);
        if (existingUser) {
            setErrors({ username: 'Username is already taken' });
            setLoading(false);
            return;
        }

        const userData = { username, password };
        await AsyncStorage.setItem(username, JSON.stringify(userData));
        setLoading(false);
        navigation.navigate('SignIn');
    };

    return (
        <ImageBackground source={require('../assets/mmm.png')} style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text h3 style={styles.title}>Sign Up</Text>
                <Input
                    style={{ color: 'white' }}
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user', color: "#f5b301" }}
                    value={username}
                    onChangeText={setUsername}
                    errorMessage={errors.username}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: "#f5b301" }}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    errorMessage={errors.password}
                    style={{ color: 'white' }}
                />
                <Button
                    title="Sign Up"
                    loading={loading}
                    onPress={handleSignUp}
                    titleStyle={styles.jj}
                    buttonStyle={styles.button}

                />
                <Button
                    title="Go to Sign In"
                    type="clear"
                    buttonStyle={styles.button2}
                    titleStyle={styles.button2Title}
                    onPress={() => navigation.navigate('SignIn')}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#0000'
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
        color: "white"
    },
    button: {
        backgroundColor: 'white',
        marginTop: 16,

    },
    button2: {
        marginTop: 16,
    },
    button2Title: {
        color: '#f5b301',
    },
    jj: {
        color: "black"
    }
});

export default SignUpScreen;
