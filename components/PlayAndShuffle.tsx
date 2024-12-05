import { View, Text, Pressable } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Play from '@/assets/icons/Play';
import Shuffle from '@/assets/icons/Shuffle';
import TrackPlayer from 'react-native-track-player';

const PlayAndShuffle = ({ songs }: { songs: any[] }) => {

  const shuffleSongs = () => {
    // Ensure songs is an array and not undefined
    if (!Array.isArray(songs) || songs.length === 0) {
      console.error("No songs available to shuffle!");
      return;
    }

    // Shuffle the songs array randomly
    const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
    
    // Filter out songs without valid URL
    const validSongs = shuffledSongs.filter(song => song.url); 
    if (validSongs.length === 0) {
      console.error("No valid songs to play!");
      return;
    }
    
    // Clear the player and add the shuffled songs
    TrackPlayer.reset();
    TrackPlayer.add(validSongs);
    TrackPlayer.play(); // Start playing the first song of the shuffled list
  };

  const playSongs = () => {
    // Ensure songs is an array and not undefined
    if (!Array.isArray(songs) || songs.length === 0) {
      console.error("No songs available to play!");
      return;
    }

    // Filter out songs without a valid URL before playing
    const validSongs = songs.filter(song => song.url); 
    if (validSongs.length === 0) {
      console.error("No valid songs to play!");
      return;
    }

    // Add the valid songs to the player and start playing
    TrackPlayer.reset();
    TrackPlayer.add(validSongs);
    TrackPlayer.play();
  };

  return (
    <View style={tw`flex-row justify-between items-center`}>
      {/* Play Button */}
      <Pressable
        style={tw`flex-row justify-center items-center gap-1 bg-gray-800 rounded-lg p-3 w-45 shadow-lg`}
        onPress={playSongs}>
        <Play />
        <Text style={tw`text-lg font-bold text-red-500`}>Play</Text>
      </Pressable>

      {/* Shuffle Button */}
      <Pressable
        style={tw`flex-row justify-center items-center gap-1 bg-gray-800 rounded-lg p-3 w-45 shadow-lg`}
        onPress={shuffleSongs}>
        <Shuffle />
        <Text style={tw`text-lg font-bold text-red-500`}>Shuffle</Text>
      </Pressable>
    </View>
  );
};

export default PlayAndShuffle;
