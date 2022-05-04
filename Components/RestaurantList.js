import React, { useState } from "react";
import { FlatList, StyleSheet, View } from 'react-native';

import Restaurant from './Restaurant';

export default function RestaurantList({ restaurantList }) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Restaurant
          item={item}
          onPress={() => setSelectedId(item.name)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurantList}
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
