import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native'; // Đúng hook từ react-navigation

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation(); // Dùng useNavigation từ react-navigation

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        'https://65465bfefe036a2fa9558ece.mockapi.io/Donut/MBBank',
      );
      const users = response.data;

      const user = users.find(
        user => user.username === username && user.password === password,
      );
      console.log('API response:', response.data);
      if (user) {
        console.log('Login successful');
        navigation.navigate('HomeTabs', {username: user.username}); // Điều hướng đến TabBottom sau khi đăng nhập thành công
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome Back!</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FDF2E9',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8E44AD',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E74C3C',
    marginTop: 10,
    textAlign: 'center',
  },
});
