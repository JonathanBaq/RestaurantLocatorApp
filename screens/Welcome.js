import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from '@rneui/themed';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>


      <View style={styles.buttons}>
        <Button title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
        <Divider
          subHeader="OR"
          inset={true}
          insetType='middle'
          subHeaderStyle={{ color: '#fdbf50', padding: 10, paddingTop: 25, paddingRight: 70 }}

        />
        <Button title="Sign up" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    flex: 1,
    padding: 20,
  },

  button: {
    marginTop: 10,
    backgroundColor: '#ff724c',
  }
});

export default WelcomeScreen;