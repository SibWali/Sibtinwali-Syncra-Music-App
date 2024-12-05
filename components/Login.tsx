import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate successful login
    navigation.navigate('Main'); // Navigate to the main Tab Navigator
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-black`}>
      <Text style={tw`text-white text-4xl font-bold mb-6`}>Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={tw`text-white p-3 bg-gray-800 rounded-md mb-4 w-80`}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={tw`text-white p-3 bg-gray-800 rounded-md mb-6 w-80`}
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={tw`bg-red-500 p-3 rounded-md w-80`} onPress={handleLogin}>
        <Text style={tw`text-white text-lg text-center`}>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Signup')} style={{ marginTop: 20 }}>
        <Text style={tw`text-white text-base`}>Don't have an account? Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
