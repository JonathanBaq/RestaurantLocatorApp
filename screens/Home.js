import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Dialog, Input } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { DialogActions } from '@rneui/base/dist/Dialog/Dialog.Actions';

import placesService from '../services/placesService';
import RestaurantList from '../Components/RestaurantList';

export default function Home() {
  const [location, setLocation] = useState('Kallio');
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [nearbyRestaurants, setNearbyRestaurants] = useState([
    {
      "address": "Hämeentie 2, Helsinki",
      "name": "Kallion Sävel",
      "priceLevel": 2,
      "rating": 4,
    },
    {
      "address": "Siltasaarenkatu 3, Helsinki",
      "name": "Restaurant Himshikhar",
      "priceLevel": 2,
      "rating": 4.2,
    },
    {
      "address": "Porthaninkatu 5 A 3, Helsinki",
      "name": "Restaurant Oiva",
      "priceLevel": 2,
      "rating": 4,
    },
    {
      "address": "Säästöpankinranta 6, Helsinki",
      "name": "Juttutupa",
      "priceLevel": 2,
      "rating": 4.1,
    },
    {
      "address": "Siltasaarenkatu 12, Helsinki",
      "name": "McDonald's",
      "priceLevel": 1,
      "rating": 3.5,
    },
    {
      "address": "John Stenbergin ranta 2, Helsinki",
      "name": "Food & Co John S",
      "priceLevel": 1,
      "rating": 4.4,
    },
    {
      "address": "Hämeentie 2, Helsinki",
      "name": "Hesburger Hakaniemi",
      "priceLevel": 2,
      "rating": 3.8,
    },
    {
      "address": "Siltasaarenkatu 11, Helsinki",
      "name": "Da Vinci Bar & Ristorante",
      "priceLevel": 2,
      "rating": 4,
    },
    {
      "address": "Siltasaarenkatu 11, Helsinki",
      "name": "Chilli Hakaniemi",
      "priceLevel": 1,
      "rating": 3.6,
    },
    {
      "address": "Toinen linja 3, Helsinki",
      "name": "Silvoplee",
      "priceLevel": 2,
      "rating": 4.4,
    },
  ]);

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
              photo: resto.photos[0].photo_reference,
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
      <Text style={styles.title}>{location}</Text>
      <RestaurantList nearbyRestaurants={nearbyRestaurants} />
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
      {/*  <Button
        style={{}}
        title='Enter location'
        onPress={() => setLocationDialogVisible(!locationDialogVisible)} /> */}
     
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 30,
  },
})