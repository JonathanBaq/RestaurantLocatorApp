import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, Button, TextInput } from 'react-native';
import { Dialog, Input } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { DialogActions } from '@rneui/base/dist/Dialog/Dialog.Actions';

import placesService from '../services/placesService';

export default function Home() {
  const [location, setLocation] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  const showRestaurant = () => {
    if (!restaurantName || restaurantName === '') {
      Alert.alert('Error', 'Restaurant name missing.')
    } else {
      placesService.getRestaurant(restaurantName)
        .then(data => {
          if (data && data.length !== 0) {
            const foundRestaurant = data[0];
            setRestaurant({ ...restaurant, ...foundRestaurant });
            setRestaurant(state => {
              console.log(state);
            });
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
          const coordinates = {
            latitude: data.lat,
            longitude: data.lng
          };
          showNearbyRestaurants(coordinates);
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'Please enter a valid location.');
        })
    }
  };

  const showNearbyRestaurants = (coordinates) => {
    if (!coordinates || Object.keys(coordinates).length === 0
      && Object.getPrototypeOf(coordinates) === Object.prototype) {
      Alert.alert('Error', 'Coordinates not found.');
    } else {
      placesService.getNearbyRestaurants(coordinates)
        .then(data => {
          if (data && data.length !== 0) {
            const recommended = data.slice(0, 10);
            const formatted = recommended.map(resto => ({
              name: resto.name,
              rating: resto.rating,
              priceLevel: resto.price_level,
              address: resto.vicinity,
              icon: resto.icon
            }))
            setNearbyRestaurants(nearbyRestaurants.concat(formatted));
            setNearbyRestaurants(state => {
              console.log(state);
            })
            setLocationDialogVisible(!locationDialogVisible);

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
          <Dialog.Button
            title='Enter'
            onPress={findLocation} />
        </DialogActions>
      </Dialog>
      <Button
        style={{}}
        title='Enter location'
        onPress={() => setLocationDialogVisible(!locationDialogVisible)} />
      <View style={styles.buttonContainer}>
        <TextInput
          style={{ paddingRight: 20 }}
          placeholder='Enter restaurant name or cuisine'
          onChangeText={(text) => setRestaurantName(text)} />
        <Button
          style={{}}
          title='Find'
          onPress={showRestaurant} />
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