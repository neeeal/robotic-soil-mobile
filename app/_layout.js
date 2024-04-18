import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Map',
            title: 'Location Pins',
          }}
        />        
        <Drawer.Screen
          name="history/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'History',
            title: 'History',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
