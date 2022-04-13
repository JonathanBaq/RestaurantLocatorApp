import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, Button, TextInput } from 'react-native';
import { Dialog, Input } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { DialogActions } from '@rneui/base/dist/Dialog/Dialog.Actions';

import placesService from '../services/placesService';
import reactDom from 'react-dom';

export default function Home() {
  const [location, setLocation] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [coordinates, setCoordinates] = useState({
    "latitude": 60.1699,
    "longitude": 24.9384,
  });

  // useEffect(() => {
  //   if (!location || location === '') {
  //     setLocationDialogVisible(!locationDialogVisible);
  //   }
  // }, []);

  const showRestaurant = () => {
    if (!restaurantName || restaurantName === '') {
      Alert.alert('Error', 'Restaurant name missing.')
    } else {
      placesService.getRestaurant(restaurantName)
        .then(data => {
          if (data.length !== 0) {
            setRestaurant(data);
            setRestaurantName('');
          } else {
            Alert.alert('Not found!', 'Try entering a more specific name.')
          }
        })
        .catch(error => {
          console.log(error);
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
          console.log(error);
          Alert.alert('Error', 'Please enter a valid location.');
        })
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Dialog
        isVisible={locationDialogVisible}>
        <Dialog.Title title='Find a nearby restaurant' />
        <Input
          placeholder='Enter your location'
          leftIcon={
            <MaterialIcons name='my-location' size={24} />}
          onChangeText={text => setLocation(text)} />
        <DialogActions>
          <Dialog.Button title='Enter' onPress={() => {
            setLocationDialogVisible(!locationDialogVisible);
            findLocation();
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