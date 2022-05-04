import React, { useState } from 'react';
import { ListItem, Dialog } from '@rneui/themed'
import { Rating } from 'react-native-ratings'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CustomRating = ({ item }) => {
  return (
    <Rating
      type='custom'
      ratingColor={'#ff724c'}
      readonly={true}
      imageSize={20}
      startingValue={item.rating}
    />
  )
}

export default Restaurant = ({ item, onPress }) => {
  const [restaurantDialogVisible, setRestaurantDialogVisible] = useState(false);

  const toggleDialog = () => {
    setRestaurantDialogVisible(!restaurantDialogVisible);
  }

  let priceDesc;
  let priceStyle = styles.itemStyle;
  if (item.priceLevel === 1) {
    priceDesc = 'Cheap';
    priceStyle = { ...priceStyle, color: 'black', };
  } else if (item.priceLevel > 3) {
    priceDesc = 'Pricey'
    priceStyle = { ...priceStyle, color: 'yellow', };
  } else {
    priceDesc = 'Affordable'
    priceStyle = { ...priceStyle, color: 'green', };
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
      <Dialog
        onBackdropPress={toggleDialog}
        isVisible={restaurantDialogVisible}
        overlayStyle={styles.dialog}>
        <Dialog.Title
          title={item.name}
          titleStyle={styles.dialogTitle} />
        <CustomRating item={item} />
        <Text style={priceStyle}>Price level: {priceDesc}</Text>
        <Text style={styles.itemStyle}>{item.address}</Text>
      </Dialog>
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
});