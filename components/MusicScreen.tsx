import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import TrackPlayer, { State, useProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';

// Define the interface for MusicScreen Props
interface MusicScreenProps {
  title: string;
  artist: string;
  artwork: string;
  url: string;
  onBack: () => void; // Callback to go back to Tracks
}

const MusicScreen: React.FC<MusicScreenProps> = ({ title, artist, artwork, url, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { position, duration } = useProgress();
  const [sliderValue, setSliderValue] = useState(0);

  // Ensure TrackPlayer is set up before any actions
  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();  // This sets up the player

      // Add the new track and start playing
      await TrackPlayer.add({ id: title, title, artist, url, artwork });
      await TrackPlayer.play();
      setIsPlaying(true);
    };

    setupPlayer();

    return () => {
      TrackPlayer.reset(); // Reset player when leaving the screen or switching songs
    };
  }, [title, artist, artwork, url]); // Re-run effect when song changes

  const togglePlayPause = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const seekToPosition = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  useEffect(() => {
    setSliderValue(position); 
  }, [position]);

  return (
    <View style={styles.container}>
      {/* Artwork Image pressable to go back to Tracks screen */}
      <Pressable onPress={onBack}>
        <Image source={{ uri: artwork }} style={styles.artwork} />
      </Pressable>

      <View style={styles.infoContainer}>
        <Text style={styles.songTitle}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>

      <Slider
        style={styles.progressSlider}
        value={sliderValue}
        minimumValue={0}
        maximumValue={duration || 1}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#444"
        onSlidingComplete={seekToPosition}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <Pressable onPress={() => TrackPlayer.seekTo(position - 10)}>
          <Text style={styles.controlButton}>⏪</Text>
        </Pressable>
        <Pressable onPress={togglePlayPause}>
          <Text style={styles.controlButton}>{isPlaying ? "⏸️" : "▶️"}</Text>
        </Pressable>
        <Pressable onPress={() => TrackPlayer.seekTo(position + 10)}>
          <Text style={styles.controlButton}>⏩</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    alignItems: "center",
    padding: 20,
  },
  artwork: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 10, // Added marginTop to ensure spacing
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  artist: {
    fontSize: 16,
    color: "#ccc",
  },
  progressSlider: {
    width: "100%",
    height: 40,
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  timeText: {
    color: "#fff",
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    marginTop: 20,
  },
  controlButton: {
    fontSize: 30,
    color: "#fff",
  },
});

export default MusicScreen;
