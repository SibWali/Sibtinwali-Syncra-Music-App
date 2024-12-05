import { View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Tabs } from 'expo-router';
import Heart from '@/assets/icons/Heart';
import Playlist from '@/assets/icons/Playlist';
import Music from '@/assets/icons/Music';
import Artists from '@/assets/icons/Artists';

const Layout = () => {
  return (
    <View style={tw`flex-1 p-2 bg-black`}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'red',
            borderTopWidth: 0,
            height: 70,
            padding: 10,
            margin: 10,
            borderWidth: 0,
            borderRadius: 20,
          },
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 40,
          },
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: () => <Heart />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            tabBarLabel: 'Playlists',
            tabBarIcon: () => <Playlist />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Songs',
            tabBarIcon: () => <Music />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            tabBarLabel: 'Artists',
            tabBarIcon: () => <Artists />,
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
};

export default Layout;
