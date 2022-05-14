import { Dialog } from '@rneui/themed';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CustomRating from './CustomRating';

export default RestaurantDialog = (
  { item, deleteFromFavorites, toggleDialog, restaurantDialogVisible, showFavoriteIcon, favoriteIconName, saveToFavorites }) => {


  let priceDesc;
  let priceStyle = styles.itemStyle;
  if (item.priceLevel === 1) {
    priceDesc = 'Cheap';
    priceStyle = { ...priceStyle, color: 'black', };
  } else if (item.priceLevel > 3) {
    priceDesc = 'Pricey'
    priceStyle = { ...priceStyle, color: '#ff724c', };
  } else if (!item.priceLevel) {
    priceDesc = 'Not specified.'
    priceStyle = { ...priceStyle, color: 'black', };
  } else {
    priceDesc = 'Affordable'
    priceStyle = { ...priceStyle, color: 'green', };
  }

  return (
    <View>
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
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(item.website)}>{item.website}</Text>
        {showFavoriteIcon
          ? <MaterialCommunityIcons
            onPress={() => saveToFavorites(item)}
            style={styles.iconStyle}
            name={favoriteIconName}
            size={30}
            color='#ff724c' />
          : <MaterialCommunityIcons
            onPress={() => deleteFromFavorites(item)}
            style={styles.iconStyle}
            name="delete"
            size={30}
            color='#ff724c' />}
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  dialog: {
    flex: 0.4,
    justifyContent: 'space-evenly',
  },
  dialogTitle: {
    fontSize: 25,
    alignSelf: 'center',
  },
  itemStyle: {
    alignSelf: 'center',
    fontSize: 20,
    alignItems: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  link: {
    color: 'blue',
    alignSelf: 'center',
    fontSize: 20,
    paddingBottom: 15,
  },
});