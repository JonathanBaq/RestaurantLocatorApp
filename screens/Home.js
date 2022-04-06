import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Dialog, Input } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { DialogActions } from '@rneui/base/dist/Dialog/Dialog.Actions';

import placesService from '../services/placesService';

export default function Home() {
  const [location, setLocation] = useState('');
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    if (location === '' || !location) {
      setLocationDialogVisible(!locationDialogVisible);
    }
  }, []);

  const handleLocationInput = (text) => {
    setLocation(text);
  }

  const showRestaurants = async () => {
    if (!coordinates && Object.keys(coordinates).length === 0
      && Object.getPrototypeOf(coordinates) === Object.prototype) {
      Alert.alert('Coordinates missing.')
    } else {
      try {
        const restaurants = await placesService.getRestaurants(coordinates);
        setRestaurants(restaurants);
        console.log(restaurants);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Please enter valid coordinates.');
      }
    }
  }

  const findLocation = async () => {
    if (!location || location === '') {
      Alert.alert('Error', 'Location missing.')
    } else {
      try {
        const coordinates = await placesService.getCoordinates(location);
        setCoordinates(coordinates);
        console.log(coordinates);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Please enter a valid location.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Dialog
        isVisible={locationDialogVisible}>
        <Dialog.Title title='Welcome to eatWithMe!' />
        <Input
          placeholder='Enter your location'
          leftIcon={
            <MaterialIcons name='my-location' size={24} />}
          onChangeText={text => handleLocationInput(text)} />
        <DialogActions>
          <Dialog.Button title='Enter' onPress={async () => {
            setLocationDialogVisible(!locationDialogVisible);
            await findLocation();
            await showRestaurants();
          }} />
        </DialogActions>
      </Dialog>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})