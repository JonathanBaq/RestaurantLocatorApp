import { Dialog } from '@rneui/themed';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CustomRating from './CustomRating';

export default RestaurantDialog = (
  { item, saveToFavorites, favoriteIconName,
    toggleDialog, restaurantDialogVisible, showFavoriteIcon }) => {
      
  let priceDesc;
  let priceStyle = styles.itemStyle;
  if (item.priceLevel === 1) {
    priceDesc = 'Cheap';
    priceStyle = { ...priceStyle, color: 'black', };
  } else if (item.priceLevel > 3) {
    priceDesc = 'Pricey'
    priceStyle = { ...priceStyle, color: '#ff724c', };
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
        {showFavoriteIcon
          ? <MaterialCommunityIcons
            onPress={saveToFavorites}
            style={styles.iconStyle}
            name={favoriteIconName}
            size={30}
            color='#ff724c' />
          : <Text></Text>}
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
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