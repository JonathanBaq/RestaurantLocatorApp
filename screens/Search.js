import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import placesService from '../Services/placesService';

export default function Search() {
  const [location, setLocation] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015
  });
  const [address, setAddress] = useState('');
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log(currentLocation)
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      })
    })();
  }, []);

  useEffect(async () => {
    try {
      const nearbyRestaurants = await placesService.getNearbyRestaurants(location);
      setNearbyRestaurants(nearbyRestaurants);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Please enter a valid address.')
    }
  }, [location])

  const findAddress = async () => {
    if (!address || address === '') {
      Alert.alert('Error', 'Address missing');
    } else {
      try {
        const coordinates = await placesService.getCoordinates(address);
        setLocation({
          latitude: coordinates.lat,
          longitude: coordinates.lng
        });
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Please enter a valid address.')
      }
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}>
        {nearbyRestaurants.map((marker, index) => (
          <MapView.Marker
            key={index}
            coordinate={{ latitude: marker.geometry.location.lat, longitude: marker.geometry.location.lng }}
            title={marker.name}
            description={marker.vicinity} />
        ))}
      </MapView>
      <TextInput
        placeholder='Enter address to find nearby restuarants.'
        onChangeText={address => setAddress(address)} />
      <Button
        title='Search'
        onPress={findAddress}
        buttonStyle={styles.buttonStyle} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  buttonStyle: {
    backgroundColor: '#ff724c',
  },
})