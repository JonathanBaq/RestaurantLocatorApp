import './Config/firebase';
import 'react-native-gesture-handler';

import { ThemeProvider } from '@rneui/themed';
import RootNavigation from './Navigation';

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
