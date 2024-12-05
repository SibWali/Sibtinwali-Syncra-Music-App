import { View, TextInput } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Search from '@/assets/icons/Search';

const Searchsongs = () => {
  return (
    <View
      style={tw`bg-gray-800 rounded-lg flex-row justify-start items-center px-3 gap-2 w-full h-12`}>
      <Search />
      <TextInput
        placeholder="Find in songs"
        placeholderTextColor="#b3b3b3" // Slightly lighter gray for placeholder
        style={tw`text-lg flex-1 text-gray-300`}
      />
    </View>
  );
};

export default Searchsongs;
