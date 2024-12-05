import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Searchsongs from '@/components/SearchInput';
import data from '@/assets/data/library.json'; // Import your track data

const Artists = () => {
  // Extract unique artists from the track data
  const artists = Array.from(new Set(data.map(item => item.artist)));

  // Function to get the artwork for each artist (you could customize this logic as needed)
  const getArtistArtwork = (artist: string) => {
    const artistData = data.find(item => item.artist === artist);
    // Ensure we always return a valid string, fallback to default if undefined
    return artistData?.artwork || 'https://example.com/default-artist-image.jpg'; // Fallback URL
  };

  return (
    <View style={tw`flex-1 bg-black p-4`}>
      <Text style={tw`text-white text-4xl font-bold mb-4`}>Artists</Text>
      <Searchsongs />

      {/* ScrollView for displaying the list of artists with artwork */}
      <ScrollView contentContainerStyle={tw`p-2`}>
        {artists.map((artist, index) => (
          <TouchableOpacity key={index} style={tw`mb-4 flex-row items-center`}>
            <Image
              source={{ uri: getArtistArtwork(artist) }} // Ensure the artwork URL is always a string
              style={tw`w-16 h-16 rounded-full mr-4`} // Style for artwork image
            />
            <Text style={tw`text-white text-lg`}>{artist || 'Unknown Artist'}</Text> {/* Handle undefined artist */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Artists;
