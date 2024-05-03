import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView } from 'react-native'; // Import necessary components
import { Iconify } from 'react-native-iconify';
import HistoryModal from '../../components/modals/history.js'
import MapView, { Marker } from 'react-native-maps';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    setHistory([
      { 
        mapId: 1, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }  
      },
      { 
        mapId: 2, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        mapId: 3, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        mapId: 4, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        mapId: 5, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        mapId: 6, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        mapId: 7, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        mapId: 8, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        mapId: 9, 
        longitude: 1.0, latitude: 1.0,
        date:"Thu, May 1, 2024 13:39",
        soilProperties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
    ]);
  }, []);

  const handleItemPress = (item) => {
    setSelectedMarker(item);
    setModalVisible(true);
  };

  const handleDeleteMarker = () => {
    console.log("marker deleted")
  };  

  return (
    <SafeAreaView className="flex flex-1 h-full w-full bg-slate-100 pb-4 ">
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <View className="flex p-4 mx-4 mt-4 bg-white rounded-md">
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View className="flex flex-row w-full max-h-20">
                  <View className="flex-2">
                    <Iconify icon="mdi:location" size={28} color="#878532" />
                  </View>
                  <View className="flex-2 px-4 ">
                    <Text className="font-bold text-lg">Sampling Point # {item.mapId}</Text>
                    <Text className="font-bold">Location: 
                      <Text className="font-normal"> {item.longitude}, {item.latitude}</Text>
                    </Text>
                  </View>
                  <View className="-mt-1 flex-1 items-end">
                      <Iconify icon="formkit:right" size={20} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <View className="flex items-end px-2">
                <Text className="text-xs text-gray-400">{item.date}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.mapId.toString()}
        />
    {modalVisible && (
      <HistoryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedMarker={selectedMarker}
        handleDeleteMarker={handleDeleteMarker}
      />
    )}
    </SafeAreaView>
  );
}
