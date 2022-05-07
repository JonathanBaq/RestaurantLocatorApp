import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/themed';

import placesService from '../Services/placesService';
import firebaseService from '../Services/firebaseService';
import RestaurantList from '../Components/RestaurantList';
import RestaurantDialog from '../Components/RestaurantDialog';

export default function Favourites() {
  const [favoriteList, setFavoriteList] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    //console.log(favoriteList);
  }, [favoriteList]);

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
            const foundRestaurant = data;
            setRestaurant({ ...restaurant, ...foundRestaurant });
            setRestaurant(state => {
              console.log(state);
            });
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
    <KeyboardAvoidingView behavior={"height"}>
      <View>
        <View style={styles.buttonContainer}>
          <TextInput
            style={{ paddingRight: 10 }}
            placeholder='Enter restaurant name or cuisine'
            onChangeText={(text) => setRestaurantName(text)} />
          <Button
            buttonStyle={styles.buttonStyle}
            title='Search'
            onPress={showRestaurant} />
        </View>
        <View>
          {/* <RestaurantDialog 
        item={item}
        saveToFavorites={saveToFavorites}
        favoriteIconName={favoriteIconName}
        toggleDialog={toggleDialog}
        restaurantDialogVisible={restaurantDialogVisible}
        showFavoriteIcon={showFavoriteIcon}
      /> */}
        </View>
        <Button
          style={{}}
          title='Get Favorites'
          onPress={fetchFavorites} />
        <RestaurantList showFavoriteIcon={false} restaurantList={favoriteList} />
      </View >
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  buttonContainer: {
    flex: 1 / 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#ff724c',
  },
})