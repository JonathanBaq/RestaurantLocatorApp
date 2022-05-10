import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Text } from 'react-native';
import { Button, Divider } from '@rneui/themed';

import placesService from '../Services/placesService';
import firebaseService from '../Services/firebaseService';
import RestaurantList from '../Components/RestaurantList';

export default function Favourites() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const [resultIsVisible, setResultIsVisible] = useState(false);

  /*    useEffect(() => {
     fetchFavorites();
    }, []); */

  const fetchFavorites = () => {
    firebaseService.getFavorites()
      .then(favorites => {
        setFavoriteList(...favoriteList, favorites);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Something went wrong, please try again later.');
      })
  }

  const showRestaurant = () => {
    if (!restaurantName || restaurantName === '') {
      Alert.alert('Error', 'Restaurant name missing.')
    } else {
      placesService.getRestaurant(restaurantName)
        .then(data => {
          if (data) {
            const results = [{
              name: data.name,
              rating: data.rating,
              priceLevel: data.price_level,
              address: data.formatted_address,
              website: data.website,
            }];
            setRestaurant(results);
            setResultIsVisible(true);
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


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter restaurant name or cuisine'
          onChangeText={(text) => setRestaurantName(text)}
          value={restaurantName} />
        <Button
          buttonStyle={styles.buttonStyle}
          title='Search'
          onPress={showRestaurant} />
      </View>
     {/*  <Button
        style={{}}
        title='Get Favorites'
        onPress={fetchFavorites} /> */}
      {resultIsVisible
        ? <>
          <Text style={styles.title}>Your Searches</Text>
          <RestaurantList showFavoriteIcon={true} restaurantList={restaurant} />
          <Divider />
        </>
        : <Text></Text>}
      {favoriteList.length != 0
      ? <RestaurantList showFavoriteIcon={false} restaurantList={favoriteList} />
    : <Text style={styles.info}>No favorites yet.</Text>}
      
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  searchContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonStyle: {
    backgroundColor: '#ff724c',
  },
  title: {
    fontSize: 18,
    color: '#fdbf50',
  },
  info: {
    alignSelf: 'center',
    color: '#fdbf50',
    
  },
  input:{
    paddingRight: 15,
  },
})