import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Searchsongs from '@/components/SearchInput';
import data from '@/assets/data/library.json'; // Import your library.json file

const Playlists = () => {
  // Extract unique playlists from the track data
  const playlists = Array.from(new Set(data.flatMap(item => item.playlist || [])));

  return (
    <View style={tw`bg-black flex-1 p-4`}>
      <Text style={tw`text-white text-4xl font-bold mb-4`}>Playlists</Text>
      <Searchsongs />

      {/* ScrollView to display the list of playlists */}
      <ScrollView contentContainerStyle={tw`p-2`}>
        {playlists.length > 0 ? (
          playlists.map((playlist, index) => (
            <TouchableOpacity key={index} style={tw`mb-4`}>
              <Text style={tw`text-white text-lg`}>{playlist}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={tw`text-white text-lg`}>No playlists found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Playlists;
