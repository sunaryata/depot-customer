/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View, Text} from 'react-native';

export const SplashScreen = () => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#344D67',
      height: '100%',
      position: 'relative',
    }}>
    <View style={{height: '30%'}}>
      <Image
        source={require('../assets/icons/water.png')}
        style={{
          height: '100%',
          width: 200,
        }}
      />
    </View>

    <Text
      style={{
        color: '#E97777',
        elevation: 2,
        fontSize: 30,
        fontFamily: 'PoppinsBold',
      }}>
      DEPOT IMMANUEL
    </Text>
    <Text
      style={{
        color: '#FFEFD6',
        fontSize: 24,
        fontFamily: 'PoppinsBold',
      }}>
      MOYONGGU BARATI
    </Text>
  </View>
);
