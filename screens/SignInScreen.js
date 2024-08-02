import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { validateUsername, validatePassword } from '../utils/validation';
import ErrorMessage from '../components/ErrorMessage';

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [signInError, setSignInError] = useState('');

    const handleSignIn = async () => {
        setLoading(true);

        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);

        if (usernameError || passwordError) {
            setErrors({ username: usernameError, password: passwordError });
            setLoading(false);
            return;
        }

        const userData = JSON.parse(await AsyncStorage.getItem(username));
        if (userData && userData.password === password) {
            // Save the current username in AsyncStorage
            await AsyncStorage.setItem('currentUsername', username);

            navigation.navigate('Special Delivery', { username });
        } else {
            setSignInError('Invalid username or password');
        }
        setLoading(false);
    };

    return (
        <ImageBackground source={require('../assets/mmm.png')} style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text h3 style={styles.title}>LOGIN</Text>
                <Input
                    placeholder=""
                    leftIcon={{ type: 'font-awesome', name: 'user', color: '#f5b301' }}
                    value={username}
                    onChangeText={setUsername}
                    inputStyle={styles.input}
                    errorMessage={errors.username}
                />
                <Input
                    placeholder=""
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: '#f5b301' }}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    inputStyle={styles.input}
                    errorMessage={errors.password}
                />
                <Text style={styles.forgotPassword}>Forgot password?</Text>
                <ErrorMessage message={signInError} />
                <Button
                    title="LOGIN"
                    loading={loading}
                    onPress={handleSignIn}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                />
                <Button
                    title="CREATE ACCOUNT"
                    type="clear"
                    onPress={() => navigation.navigate('SignUp')}
                    buttonStyle={styles.button2}
                    titleStyle={styles.button2Title}
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
        backgroundColor: '#0000',
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
        color: '#fff',
    },
    input: {
        color: 'white',
    },
    forgotPassword: {
        textAlign: 'center',
        color: '#999',
        marginTop: -10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        marginTop: 16,
    },
    buttonTitle: {
        color: '#333',
    },
    button2: {
        marginTop: 16,
    },
    button2Title: {
        color: '#f5b301',
    },
});

export default SignInScreen;
