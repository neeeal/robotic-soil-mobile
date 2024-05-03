import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView, Dimensions, Modal, Pressable } from 'react-native';
import MapView, { Marker, Callout, AnimatedRegion  } from 'react-native-maps';
import * as Location from 'expo-location';
import { Iconify } from 'react-native-iconify';
import MarkerModal from '../../components/modals/marker'; 
import { GET_MARKER, DELETE_MARKER, GET_BASE_URL } from '../../helpers/API'
import { GET_RANDOM_COLOR } from '../../helpers/utils'

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(-1)

  useEffect(() => {
    const fetchData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      const longitudeDelta = 1; // Longitude delta for the Philippines
      const latitudeDelta = 1; // Latitude delta for the Philippines
      const longitude = 121.062; // Longitude delta for the Philippines
      const latitude = 14.626; // Latitude delta for the Philippines
      setLocation({
        longitudeDelta: longitudeDelta,
        latitudeDelta: latitudeDelta,
        longitude: longitude,
        latitude: latitude
      });
  
      const data = await GET_MARKER(userId); // Await the function call
  
      // Check if data is valid before processing it further
      if (Array.isArray(data)) {
        const newMarkers = data.filter(markerData => !markers.some(marker => marker.mapId === markerData.mapId));
  
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
              potassium: String(data.potassium)
            }
          }));
  
          setMarkers(prevMarkers => [...prevMarkers, ...newEntries]);
        }
      } else {
        console.error('Invalid data received:', data);
      }
    };
  
    // Fetch data initially
    fetchData();
  
    const intervalId = setInterval(fetchData, 10000);
  
    // Clean up function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  

  // async function handleMapPress (event) {
  //   const { coordinate } = event.nativeEvent;
  //   const randomSoilProperties = generateRandomSoilProperties();
  //   const mapId = String(14.626).replace('.','_').slice(0,)+ '_' + String(14.626)
  //                     .replace('.','_').slice(0,8) + '_' + Math.floor(Math.random() * 10000)
                      

  //   const result = await storeMarker(mapId, userId, coordinate, randomSoilProperties);
  //   setMarkers([...markers, { mapId:mapId, ...coordinate, soilProperties: randomSoilProperties }]);
  // };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  // const generateRandomSoilProperties = () => {
  //   return {
  //     nitrogen: (Math.random() * 10).toFixed(2),
  //     phosphorus: (Math.random() * 10).toFixed(2),
  //     potassium: (Math.random() * 10).toFixed(2),
  //     acidity: (Math.random() * 14).toFixed(2),
  //     moisture: `${(Math.random() * 100).toFixed(2)}%`,
  //     image: "none"
  //   };
  // };

  async function handleDeleteMarker () {
    const updatedMarkers = markers.filter((marker) => marker.mapId !== selectedMarker.mapId);
    result = await DELETE_MARKER(selectedMarker.mapId)
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  // async function storeMarker(mapId, userId,coordinates,properties){
  //   // Specify the API endpoint for user data
  //   const apiUrl = baseUrl+'analysis/store/'+userId;
  //   console.log(apiUrl)

  //   const toStore = { mapId:mapId, ...coordinates, ...properties }
  //   console.log(toStore)

  //   // Make a GET request using the Fetch API
  //   const data = await fetch(apiUrl,{
  //     method: 'POST',
  //     headers: { 
  //       'Content-type': 'application/json' 
  //     },
  //     body: JSON.stringify(toStore)
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //         // console.log(response)
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(response => {
  //       // Process the retrieved user data
  //       console.log('msg:', response.msg);
  //       // console.log("analysis:", response.analysis);
  //       return {msg: "Store success", data: toStore}
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //       // Log the response for more information
  //       console.log('Response:', error);
  //       // console.log('body:', response);
  //     });

  //     if(!data){
  //       return false
  //     }

  //     return data
  // }

  return (
    <SafeAreaView className="flex flex-1 h-full">
      <ScrollView className="flex flex-1 h-full">
        <View className="flex-row py-6 px-4 bg-white">
          <View className="flex-1">
            <Text className="font-bold text-sm">Tap on any sampling point from the map above to show details</Text>
            </View>
          <View className="flex-2 items-end">
          <Iconify icon="mage:filter" size={16} color="black" />
            </View>
        </View>
        <View className="flex flex-1 items-center justify-center">
            <MapView
              showsMyLocationButton={true}
              zoomControlEnabled={true}
              showsUserLocation={true}
              initialRegion={location}
              minZoomLevel={1}
              mapType='terrain'
              style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  pinColor={GET_RANDOM_COLOR(marker)}
                  coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                  onPress={() => handleMarkerPress(marker)}
                >
                  <Callout>
                    <View>
                      <Text>Tap here for details</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          <MarkerModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedMarker={selectedMarker}
            handleDeleteMarker={handleDeleteMarker}
          />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MapPage;