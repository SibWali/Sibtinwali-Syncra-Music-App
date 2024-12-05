import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Ellipsis from '@/assets/icons/Ellipsis';

const Track = ({ image, title, name, onPress }) => {
    return (
        <View style={tw`flex-row gap-3 justify-between items-center mb-2`}>
            <Image source={image} style={tw`h-12 w-12 rounded-lg`} />
            <Pressable onPress={onPress} style={tw`flex-1 pb-3`}>
                <Text style={tw`text-white text-lg`}>{title}</Text>
                <Text style={tw`text-white text-lg`}>{name}</Text>
            </Pressable>
            <Ellipsis />
        </View>
    );
};

export default Track;
