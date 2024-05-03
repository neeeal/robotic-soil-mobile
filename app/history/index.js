import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView } from 'react-native'; // Import necessary components
import { Iconify } from 'react-native-iconify';
import HistoryModal from '../../components/modals/history.js'
import MapView, { Marker } from 'react-native-maps';
import { GET_MARKER, DELETE_MARKER } from '../../helpers/API'

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(-1)
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await GET_MARKER(userId); // Await the function call
  
      // Check if data is valid before processing it further
      if (Array.isArray(data)) {
        const newMarkers = data.filter(markerData => !history.some(marker => marker.mapId === markerData.mapId));
  
        if (newMarkers.length > 0) {
          const newEntries = newMarkers.map(data => ({
            mapId: data.mapId,
            latitude: data.latitude,
            longitude: data.longitude,
            soilProperties: {
              moisture: String(data.moisture),
              acidity: String(data.acidity),
              nitrogen: String(data.nitrogen),
              phosphorus: String(data.phosphorus),
              potassium: String(data.potassium),
            },
            date:data.dateAdded
          }));
  
          setHistory(prevMarkers => [...prevMarkers, ...newEntries]);
        }
      } else {
        console.error('Invalid data received:', data);
      }
    };
  
    // Fetch data initially
    fetchData();
  
    // const intervalId = setInterval(fetchData, 10000);
  
    // // Clean up function to clear interval when component unmounts
    // return () => clearInterval(intervalId);
  }, []);

  const handleItemPress = (item) => {
    setSelectedMarker(item);
    setModalVisible(true);
  };

  async function handleDeleteMarker () {
    const updatedMarkers = history.filter((marker) => marker.mapId !== selectedMarker.mapId);
    result = await DELETE_MARKER(selectedMarker.mapId)
    setHistory(updatedMarkers);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex flex-1 h-full w-full bg-slate-100 pb-4 ">
        <View className="flex-row py-6 px-4 bg-white ">
          <View className="flex-1 ">
            <Text className="font-bold text-sm">Tap on previous samples to view details</Text>
          </View>
          <View className="flex-2 items-end">
            <TouchableOpacity>
                <Iconify icon="mage:filter" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
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
