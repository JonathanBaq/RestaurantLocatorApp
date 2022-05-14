import React, { useState } from 'react';
import { ListItem } from '@rneui/themed';
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native';

import firebaseService from '../Services/firebaseService';
import CustomRating from './CustomRating';
import RestaurantDialog from './RestaurantDialog';


export default Restaurant = ({ item, showFavoriteIcon, deleteFromFavorites, favoriteIconName, saveToFavorites}) => {
  const [restaurantDialogVisible, setRestaurantDialogVisible] = useState(false);
  
  const toggleDialog = () => {
    setRestaurantDialogVisible(!restaurantDialogVisible);
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
        deleteFromFavorites={deleteFromFavorites}
        toggleDialog={toggleDialog}
        restaurantDialogVisible={restaurantDialogVisible}
        showFavoriteIcon={showFavoriteIcon}
        favoriteIconName={favoriteIconName}
        saveToFavorites={saveToFavorites}
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