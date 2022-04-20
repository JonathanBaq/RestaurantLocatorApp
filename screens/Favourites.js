import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';

export default function Favourites() {
  const [restaurantName, setRestaurantName] = useState('');

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

  return (
    <View style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1 / 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})