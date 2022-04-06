import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import placesService from '../services/placesService';

export default function Search() {
  const [location, setLocation] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015
  });
  const [address, setAddress] = useState('');
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  useEffect(async () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      })
    })();
  }, []);

  const findAddress = async () => {
    if (!address || address === '') {
      Alert.alert('Error', 'Address missing');
    } else {
      try {
        const nearbyRestaurants = await placesService.getNearbyRestaurants(address);
        setNearbyRestaurants(nearbyRestaurants);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Please enter a valid address.')
      }
    }
  }

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        }}>
        {
          nearbyRestaurants.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{ latitude: marker.geometry.location.lat, longitude: marker.geometry.location.lng }}
              title={marker.name}
              description={marker.vicinity} />
          ))
        }
      </MapView>
      <TextInput
        placeholder='Enter address to find restaurant.'
        onChangeText={address => setAddress(address)} />
      <Button
        title='Show'
        onPress={findAddress} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})