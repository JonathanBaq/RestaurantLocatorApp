import React, { useState } from 'react';
import { ListItem } from '@rneui/themed';
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native';


import firebaseService from '../Services/firebaseService';
import CustomRating from './CustomRating';
import RestaurantDialog from './RestaurantDialog';


export default Restaurant = ({ item, showFavoriteIcon }) => {
  const [restaurantDialogVisible, setRestaurantDialogVisible] = useState(false);
  const [favoriteIconName, setFavoriteIconName] = useState('heart-outline');

  const toggleDialog = () => {
    setRestaurantDialogVisible(!restaurantDialogVisible);
  }

  const saveToFavorites = () => {
    firebaseService.addToFavorites(item)
      .then(() => {
        setFavoriteIconName('heart');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Something went wrong, try again later.');
      })
  }

  return (
    <View>
      <TouchableOpacity onPress={toggleDialog} >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.itemTitle}>{item.name}</ListItem.Title>
            <CustomRating item={item} />
          </ListItem.Content>
          <ListItem.Chevron color="black" onPress={toggleDialog} />
        </ListItem>
      </TouchableOpacity>
      <RestaurantDialog 
        item={item}
        saveToFavorites={saveToFavorites}
        favoriteIconName={favoriteIconName}
        toggleDialog={toggleDialog}
        restaurantDialogVisible={restaurantDialogVisible}
        showFavoriteIcon={showFavoriteIcon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 20,
  },
  dialog: {
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  dialogTitle: {
    fontSize: 25,
    alignSelf: 'center',
  },
  itemStyle: {
    alignSelf: 'center',
    fontSize: 20,
  },
  iconStyle: {
    alignSelf: 'center',
  },
});