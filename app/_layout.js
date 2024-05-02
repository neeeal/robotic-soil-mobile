import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import MapPage from './map/index.js';
import HistoryPage from './history/index.js';
import HomePage from './home/index.js';
import { Text } from 'react-native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Text className="mt-8 px-4 font-bold text-xl">Menu</Text>
      <Text className="pl-4 text-xs mb-8">Navigate our Soil Nutrient Map application</Text>
      <DrawerItemList 
        {...props}
        />
    </DrawerContentScrollView>
  );
}

export default function MyDrawer() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#878532',
        drawerInactiveTintColor: 'black',
        itemStyle: { marginVertical: 5 }, // Adjust vertical margin between items
        labelStyle: { fontSize: 16 }, // Adjust text size of items
        drawerItemStyle: { backgroundColor: 'white' }, // Change background color of items
        drawerActiveBackgroundColor: 'white', // Change background color of the active item
        // You can add more options here as needed
      }}
      >
      <Drawer.Screen 
        name="home/index" 
        component={HomePage} 
        options={{
          title: "HOME",
          drawerLabel: "Home",     
          headerTitleStyle: { fontSize: 14, fontWeight: 'bold',  marginLeft: -12  },
        }}
      />
      <Drawer.Screen 
        name="map/index" 
        component={MapPage} 
        options={{
          title: "SOIL NUTRIENT MAP",
          drawerLabel: "Maps",
          headerTitleStyle: { fontSize: 14, fontWeight: 'bold',  marginLeft: -12 },
        }}
      />
      <Drawer.Screen 
        name="history/index" 
        component={HistoryPage} 
        options={{
          title: "HISTORY RECORDS",
          drawerLabel: "History",
          headerTitleStyle: { fontSize: 14, fontWeight: 'bold',  marginLeft: -12  },
        }}
      />
    </Drawer.Navigator>
  );
}
