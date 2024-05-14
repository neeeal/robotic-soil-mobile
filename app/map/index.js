import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Iconify } from 'react-native-iconify';
import MarkerModal from '../../components/modals/marker'; 
import { GET_MARKER, DELETE_MARKER } from '../../helpers/API'
import { GET_RANDOM_COLOR } from '../../helpers/utils'

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(-1)

  const fetchData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    const longitudeDelta = 1;
    const latitudeDelta = 1;
    const longitude = 121.062;
    const latitude = 14.626;
    setLocation({
      longitudeDelta: longitudeDelta,
      latitudeDelta: latitudeDelta,
      longitude: longitude,
      latitude: latitude
    });

    let page = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const data = await GET_MARKER(userId, page);

      if (Array.isArray(data) && data.length > 0) {
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
            },
            date: String(data.dateAdded)
          }));

          setMarkers(prevMarkers => [...prevMarkers, ...newEntries]);
        }
        page++;
      } else {
        hasMoreData = false;
      }
    }
  };

  useEffect(() => {  
    fetchData();
  }, []);  

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  async function handleDeleteMarker () {
    const updatedMarkers = markers.filter((marker) => marker.mapId !== selectedMarker.mapId);
    result = await DELETE_MARKER(selectedMarker.mapId)
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };

  const handleRefreshPress = async () => {
    setMarkers([]);
    await fetchData();
  }

  return (
    <SafeAreaView className="flex flex-1 h-full">
      <ScrollView className="flex flex-1 h-full">
      <View className="flex-row py-6 px-4 bg-white">
          <View className="flex-1">
            <Text className="font-bold text-sm">Tap on any sampling point from the map above to show details</Text>
          </View>
          <View className="flex-2 items-end">
            <TouchableOpacity onPress={()=>handleRefreshPress()}>
              <Iconify icon="mage:reload" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-1 items-center justify-center">
            <MapView
              provider={PROVIDER_GOOGLE}
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
                      <Text className="text-xs">Sample Point #{marker.mapId}</Text>
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