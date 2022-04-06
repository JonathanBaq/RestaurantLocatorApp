import { API_KEY } from '@env';
import { Alert } from 'react-native';

const getCoordinates = async (location) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const coordinates = await data.results[0].geometry.location;
    return {
      latitude: coordinates.lat,
      longitude: coordinates.lng
    }
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Something went wrong in fetch.');
  }
}

const getRestaurants = async (coordinates) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurants&inputtype=textquery&locationbias=circle%3A1000%${coordinates.latitude}%2C${coordinates.longitude}&fields=formatted_address%2Cname%2Crating%2Copening_hours&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.candidates;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Something went wrong in fetch.');
  }
}

const getNearbyRestaurants = async (coordinates) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.latitude},${coordinates.longitude}&radius=500&type=restaurant&key=${API_KEY}`;//results dont show restos in shopping malls
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Something went wrong in fetch.');
  }
}

export default { getCoordinates, getRestaurants, getNearbyRestaurants };