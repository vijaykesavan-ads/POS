import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    View,
    ImageBackground,
} from 'react-native';

const USERS = [
    { username: 'admin', password: 'admin123', role: 'ADMIN' },
    { username: 'staff', password: 'staff123', role: 'EMPLOYEE' },
];

export default function LoginScreen({ setScreen, setUser }: any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!username.trim()) {
            Alert.alert('Error', 'Username is required');
            return;
        }
        if (!password.trim()) {
            Alert.alert('Error', 'Password is required');
            return;
        }

        const found = USERS.find(
            (u) => u.username === username.trim() && u.password === password
        );

        if (!found) {
            Alert.alert('Login failed', 'Invalid username or password');
            return;
        }

        setUser(found);
        setScreen('POS');
    };

    return (
        <ImageBackground
            source={{ uri: "https://picsum.photos/400/800" }}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>🍴 Restaurant POS</Text>
                    <Text style={styles.subtitle}>Login to continue</Text>

                    <TextInput
                        placeholder="Enter Username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        autoCapitalize="none"
                        placeholderTextColor="#aaa"
                    />

                    <TextInput
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="#aaa"
                    />

                    <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'stretch',
        justifyContent: "space-between",
        backgroundColor: "#000",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 16,
        padding: 24,
        // shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // elevation: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginBottom: 14,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    btnPrimary: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    btnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});
