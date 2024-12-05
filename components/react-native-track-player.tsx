import { FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import TrackPlayer, { State } from 'react-native-track-player'; // Make sure to import State from TrackPlayer
import className from 'twrnc';
import Ellipsis from '@/assets/icons/Ellipsis';
import data from '../assets/data/library.json';
import Play from '@/assets/icons/Play';
import Stop from '@/assets/icons/Stop';
import Forward from '@/assets/icons/Forward';

// Define the TrackData interface for the track item
interface TrackData {
    url: string;
    title: string;
    artist?: string;  // Make artist optional
    artwork?: string;  // Make artwork optional
    rating?: number;   // Make rating optional
    playlist?: string[]; // Make playlist optional
}

const index = () => {
    const [trackHide, setTrackHide] = useState(false);
    const [trackSelected, setTrackSelected] = useState<TrackData | null>(null); // Use TrackData type
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const startPlayer = async () => {
            await TrackPlayer.setupPlayer();
        };

        startPlayer();

        return () => {
            // Reset player to clean up resources
            TrackPlayer.reset();
        };
    }, []);

    const toggleButton = async (item: TrackData) => {  // Explicitly type item as TrackData
        const trackToPlay = {
            id: item.url,
            url: item.url,
            title: item.title,
            artist: item.artist ?? 'Unknown Artist', // Provide default value if artist is missing
            artwork: item.artwork ?? 'default_artwork_url', // Provide default value if artwork is missing
        };

        if (trackSelected?.url === item.url && isPlaying) {
            // Pause if the same track is clicked again
            await TrackPlayer.pause();
            setIsPlaying(false);
        } else {
            if (trackSelected?.url !== item.url) {
                // Load and play new track
                await TrackPlayer.reset();
                await TrackPlayer.add(trackToPlay);
            }

            await TrackPlayer.play();
            setIsPlaying(true);
            setTrackSelected(item);
            setTrackHide(true);
        }
    };

    return (
        <View style={className`flex-1 p-5 gap-5 bg-black`}>
            <Text style={className`text-3xl font-semibold text-white`}>Songs</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.url}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => toggleButton(item)}>
                            <Track label={item.title} name={item.artist ?? 'Unknown Artist'} source={{ uri: item.artwork ?? 'default_artwork_url' }} />
                        </Pressable>
                    )}
                />
            </ScrollView>

            {trackHide && trackSelected && (
                <View style={className`flex-row justify-between items-center gap-3 mt-2`}>
                    <TrackPopup source={{ uri: trackSelected.artwork ?? 'default_artwork_url' }} label={trackSelected.title} />
                </View>
            )}
        </View>
    );
};

const Track = ({ source, label, name }: { source: any; label: string; name: string }) => {  // Explicitly define the props' types
    return (
        <View style={className`flex-row justify-between items-center gap-3 mt-2`}>
            <Image source={source} style={className`h-10 w-10 rounded-lg border border-gray-300`} />
            <View style={className`flex-1`}>
                <Text style={className`text-lg font-semibold text-white`}>{label}</Text>
                <Text style={className`text-md text-gray-300`}>{name}</Text>
            </View>
            <Ellipsis />
        </View>
    );
};

const TrackPopup = ({ source, label }: { source: any; label: string }) => {  // Explicitly define the props' types
    const [playStop, setPlayStop] = useState(false);

    const togglePlayStop = async () => {
        const state = await TrackPlayer.getState();
        if (state === State.Playing) {  // Use State.Playing from TrackPlayer
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
        setPlayStop(!playStop);
    };

    return (
        <View style={className`flex-row justify-between items-center gap-3 mt-2`}>
            <Image source={source} style={className`h-10 w-10 rounded-lg border border-gray-300`} />
            <View style={className`flex-1`}>
                <Text style={className`text-lg font-semibold text-white`}>{label}</Text>
            </View>
            <View style={className`flex-row gap-5 pr-3 items-center`}>
                <Pressable onPress={togglePlayStop}>
                    {playStop ? <Play /> : <Stop />}
                </Pressable>
                <Forward />
            </View>
        </View>
    );
};

export default index;
