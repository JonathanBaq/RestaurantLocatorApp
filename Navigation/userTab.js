import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../Screens/Home';
import Search from '../Screens/Search';
import Favourites from '../Screens/Favourites';

const Tab = createBottomTabNavigator();

export default function UserTab() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-filled'
              : 'home';
          } else if (route.name === 'Map') {
            iconName = focused
              ? 'map-search'
              : 'map-search-outline'
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Favourites') {
            iconName = focused
              ? 'favorite'
              : 'favorite-outline';
          } 

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff724c',
        tabBarLabel: () => {return null},
        headerTintColor: '#ff724c'
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Map' component={Search} />
      <Tab.Screen name='Favourites' component={Favourites} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}