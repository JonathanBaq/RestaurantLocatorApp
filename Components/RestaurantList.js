import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ListItem } from '@rneui/themed'
import { Rating } from 'react-native-ratings'

const Item = ({ item, onPress }) => {
  let priceDesc;
  let priceStyle;
  if (item.priceLevel === 1) {
    priceDesc = 'Cheap';
    priceStyle = styles.cheap;
  } else if (item.priceLevel > 3) {
    priceDesc = 'Pricey'
    priceStyle = styles.pricey;
  } else {
    priceDesc = 'Affordable'
    priceStyle = styles.affordable;
  }

  return (
    <TouchableOpacity onPress={onPress} >
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={styles.itemTitle}>{item.name}</ListItem.Title>
          <Text style={priceStyle}>{priceDesc}</Text>
          <Rating
            type='custom'
            ratingColor={'#ff724c'}
            readonly={true}
            imageSize={20}
            startingValue={item.rating}
          />
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>
    </TouchableOpacity>
  )
}

export default function RestaurantList({ nearbyRestaurants }) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Item
          item={item}
          onPress={() => setSelectedId(item.name)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={nearbyRestaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        extraData={selectedId}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    marginHorizontal: 10,
  },
  itemTitle: {
    fontSize: 20,
  },
  cheap: {
    color: 'black',
  },
  pricey: {
    color: 'yellow'
  },
  affordable: {
    color: 'green'
  },
});
