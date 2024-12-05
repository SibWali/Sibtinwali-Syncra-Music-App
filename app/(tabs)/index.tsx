import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Searchsongs from '@/components/SearchInput';
import PlayAndShuffle from '@/components/PlayAndShuffle';
import Tracks from '@/components/Tracks';

const Index = () => {
  return (
    <View style={tw`bg-black flex-1 gap-2`}>
      <Text style={tw`text-white text-4xl font-bold`}>Songs</Text>
      <Searchsongs />
      <PlayAndShuffle />
      <Tracks />
    </View>
  );
};

export default Index;
