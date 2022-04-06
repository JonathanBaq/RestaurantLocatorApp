import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './screens/Home';
import Search from './screens/Search';
import Favourites from './screens/Favourites';
import Invitations from './screens/Invitations';

const Tab = createBottomTabNavigator();

export default function App() {
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
            } else if (route.name === 'Search') {
              iconName = focused
                ? 'map-search'
                : 'map-search-outline'
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Favourites') {
              iconName = focused
                ? 'favorite'
                : 'favorite-outline';
            } else if (route.name === 'Invitations') {
              iconName = focused
                ? 'insert-invitation'
                : 'restaurant';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff724c',
        })}
      >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Search' component={Search} />
        <Tab.Screen name='Favourites' component={Favourites} />
        <Tab.Screen name='Invitations' component={Invitations} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
