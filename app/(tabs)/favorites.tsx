import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Searchsongs from '@/components/SearchInput';
import PlayAndShuffle from '@/components/PlayAndShuffle';
import Track from '@/components/Track';
import data from '@/assets/data/library.json'; // Import your track data

const Favorites = () => {
  return (
    <View style={tw`bg-black flex-1 gap-2`}>
      <Text style={tw`text-white text-4xl font-bold mb-4`}>Favorites</Text>
      <Searchsongs />
      <PlayAndShuffle />

      {/* ScrollView for displaying tracks */}
      <ScrollView contentContainerStyle={tw`p-4`}>
        {data.map((item, index) => (
          <TouchableOpacity key={index} style={tw`mb-6`}>
            {/* Track component or custom track display */}
            <View style={tw`flex-row items-center`}>
              <Image source={{ uri: item.artwork }} style={tw`w-20 h-20 rounded-lg mr-4`} />
              <View style={tw`flex-1`}>
                <Text style={tw`text-white font-semibold text-lg`}>{item.title}</Text>
                <Text style={tw`text-gray-400`}>{item.artist}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
