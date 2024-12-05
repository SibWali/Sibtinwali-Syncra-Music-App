import { View, FlatList } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import Track from './Track';
import data from '../assets/data/library.json';
import MusicScreen from './MusicScreen';

interface TrackData {
  title: string;
  artist: string;
  artwork: string;
  url: string;
  playlist?: string[];
  rating?: number;
}

const Tracks = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selected, setSelected] = useState<TrackData | null>(null);

  const togglePopup = (item: TrackData) => {
    setPopupVisible(!popupVisible);
    setSelected(item);
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      {!popupVisible && (
        <FlatList
          data={data}
          renderItem={({ item }: { item: TrackData }) => (
            <Track
              onPress={() => togglePopup(item)}
              image={item.artwork}
              title={item.title}
              name={item.artist}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={tw`pb-10`}
        />
      )}
      {popupVisible && selected && (
        <MusicScreen
          title={selected.title}
          artist={selected.artist}
          artwork={selected.artwork}
          url={selected.url}
          onBack={() => setPopupVisible(false)} // Close popup when artwork is pressed
        />
      )}
    </View>
  );
};

export default Tracks;
