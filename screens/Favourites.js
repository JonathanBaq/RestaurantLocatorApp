import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Favourites() {
  return (
    <View style={styles.container}>
      <Text>Favourites Page</Text>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})