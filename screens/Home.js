import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Dialog, Input, Button, Divider } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { DialogActions } from '@rneui/base/dist/Dialog/Dialog.Actions';
import { getAuth, signOut } from 'firebase/auth';

import placesService from '../Services/placesService';
import firebaseService from '../Services/firebaseService';
import RestaurantList from '../Components/RestaurantList';
import { useAuthentication } from '../Services/authenticationService';

export default function Home() {
  const [location, setLocation] = useState('kallio');
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
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
  const [coordinates, setCoordinates] = useState({});
  const [favoriteIconName, setFavoriteIconName] = useState('heart-outline');

  const { user } = useAuthentication();
  const auth = getAuth();

  /* useEffect(() => {
    if (!location) {
      toggleDialog();
    }
  }, [])

  useEffect(() => {
    showNearbyRestaurants(coordinates);
  }, [coordinates]) */

  const saveToFavorites = (item) => {
    firebaseService.addToFavorites(item)
      .then(() => {
        setFavoriteIconName('heart');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Something went wrong, try again later.');
      }) 
  }

  const toggleDialog = () => {
    setLocationDialogVisible(!locationDialogVisible);
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
          setCoordinates(coordinates);
          toggleDialog();
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'Please enter a valid location.');
        })
    }
  };

  const showNearbyRestaurants = (coordinates) => {
    placesService.getNearbyRestaurants(coordinates)
      .then(data => {
        const recommended = data.slice(0, 10);
        const formatted = recommended.map(resto => ({
          name: resto.name,
          rating: resto.rating,
          priceLevel: resto.price_level,
          address: resto.vicinity,
        }))
        setNearbyRestaurants(...nearbyRestaurants, formatted);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Could not find nearby restaurants, please try again.')
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.logout}>
        <Text style={styles.logoutText}>Welcome {user?.email}!</Text>
        <Button title="Sign Out" buttonStyle={styles.buttonStyle} onPress={() => signOut(auth)} />
      </View>
      <Divider />
      <View style={styles.searchContainer}>
        <Text style={styles.title}>{location}</Text>
        {location
          ? <Button
            buttonStyle={styles.buttonStyle}
            title='Change location'
            onPress={toggleDialog} />
          : <Text></Text>}

      </View>
      <Divider />
      <RestaurantList saveToFavorites={saveToFavorites} favoriteIconName={favoriteIconName} showFavoriteIcon={true} restaurantList={nearbyRestaurants} />
      <Dialog
        isVisible={locationDialogVisible}
        onBackdropPress={toggleDialog} >
        <Dialog.Title
          title='Welcome!'
          titleStyle={styles.dialogText} />
        <Input
          label='Start by entering your location'
          leftIcon={
            <MaterialIcons name='my-location' size={24} />}
          onChangeText={text => setLocation(text)} />
        <DialogActions>
          <Button
            buttonStyle={styles.buttonStyle}
            title='Enter'
            onPress={findLocation} />
        </DialogActions>
      </Dialog>
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
    color: '#fdbf50',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    backgroundColor: '#ff724c',
  },
  dialogText: {
    color: '#fdbf50',
  },
  logout: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  logoutText: {
    fontSize: 15,
    color: '#2a2c41'
  },
})