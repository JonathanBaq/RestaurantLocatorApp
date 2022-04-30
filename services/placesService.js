import { GOOGLE_PLACES_API_KEY } from '@env';
import { Alert } from 'react-native';

const getCoordinates = async (location) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const coordinates = await data.results[0].geometry.location;
    return coordinates;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Something went wrong in fetch.');
  }
}

const getPlaceId = async (restaurantName) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${restaurantName}&inputtype=textquery&fields=place_id&key=${GOOGLE_PLACES_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.candidates[0].place_id;
}

const getRestaurant = async (restaurantName) => {
  try {
    const placeId = await getPlaceId(restaurantName);
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address%2Cname%2Crating%2Cprice_level%2Cwebsite&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.result; 
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Something went wrong in fetch.');
  }
}

const getNearbyRestaurants = async (coordinates) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.latitude},${coordinates.longitude}&radius=500&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`;//results dont show restos in shopping malls
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Something went wrong in fetch.');
  }
}

export default { getCoordinates, getRestaurant, getNearbyRestaurants };