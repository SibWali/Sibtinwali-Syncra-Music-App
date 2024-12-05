import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Simulate successful signup
    navigation.navigate('Login'); // Navigate back to Login screen after signup
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-black`}>
      <Text style={tw`text-white text-4xl font-bold mb-6`}>Sign Up</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#aaa"
        style={tw`text-white p-3 bg-gray-800 rounded-md mb-4 w-80`}
        value={name}
        onChangeText={setName}
      />
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
      <Pressable style={tw`bg-red-500 p-3 rounded-md w-80`} onPress={handleSignup}>
        <Text style={tw`text-white text-lg text-center`}>Sign Up</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
        <Text style={tw`text-white text-base`}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
};

export default SignupScreen;
