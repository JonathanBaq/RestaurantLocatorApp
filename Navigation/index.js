import React from 'react';

import { useAuthentication } from '../Services/authenticationService';
import UserTab from './userTab';
import AuthStack from './authStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserTab /> : <AuthStack />;
}