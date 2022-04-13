import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Button, TextInput } from 'react-native';
import { Dialog, Input } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { DialogActions } from '@rneui/base/dist/Dialog/Dialog.Actions';
import * as Location from 'expo-location';

import placesService from '../services/placesService';


export default function Home() {
  const [location, setLocation] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [coordinates, setCoordinates] = useState({
    "latitude": 60.1699,
    "longitude": 24.9384,
  });

  useEffect(() => {
    if (!location || location === '') {
      setLocationDialogVisible(!locationDialogVisible);
    }
  }, []);

  const showRestaurant = () => {
    if (!restaurantName || restaurantName === '') {
      Alert.alert('Error', 'Restaurant name missing.')
    } else {
      placesService.getRestaurant(restaurantName)
        .then(data => {
          if (data && data.length !== 0) {
            setRestaurant(data);
            setRestaurantName('');
          } else {
            Alert.alert('Not found!', 'Try entering a more specific name.')
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'Please enter a valid name.');
        })
    }
  }

  const findLocation = () => {
    if (!location || location === '') {
      Alert.alert('Error', 'Location missing.')
    } else {
      placesService.getCoordinates(location)
        .then(data => {
          if (data) {
            setCoordinates({
              latitude: data.lat,
              longitude: data.lng
            });
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'Please enter a valid location.');
        })
    }
  };

  const showNearbyRestaurants = () => {
    if (!coordinates || Object.keys(coordinates).length === 0
      && Object.getPrototypeOf(coordinates) === Object.prototype) {
      Alert.alert('Error', 'Coordinates not found.');
    } else {
      placesService.getNearbyRestaurants(coordinates)
        .then(data => {
          console.log(data);
          if (data && data.length !== 0) {
            setNearbyRestaurants(data);
          } else {
            Alert.alert('Not found!', 'Restaurants not found, please try again.');
            setLocationDialogVisible(!locationDialogVisible);
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'Could not find nearby restaurants, please try again.')
        })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Dialog
        isVisible={locationDialogVisible}>
        <Dialog.Title title='Welcome to eatWithMe!' />
        <Input
          placeholder='Start by entering your location'
          leftIcon={
            <MaterialIcons name='my-location' size={24} />}
          onChangeText={text => setLocation(text)} />
        <DialogActions>
          <Dialog.Button title='Enter' onPress={() => {
            findLocation();
            console.log(coordinates);
            showNearbyRestaurants();
            setLocationDialogVisible(!locationDialogVisible);
          }} />
        </DialogActions>
      </Dialog>
      <View style={styles.buttonContainer}>
        <TextInput
          style={{ paddingRight: 20 }}
          placeholder='Enter restaurant name or cuisine'
          onChangeText={text => setRestaurantName(text)} />
        <Button
          style={{}}
          title='Find'
          onPress={() => {
            showRestaurant();
            console.log(restaurant);
          }} />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  buttonContainer: {
    flex: 1 / 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})