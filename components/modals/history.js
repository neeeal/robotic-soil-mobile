import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, Pressable, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed
import MapView, { Marker, Callout  } from 'react-native-maps';
import { GET_RANDOM_COLOR } from '../../helpers/utils'

const HistoryModal = ({ modalVisible, setModalVisible, selectedMarker, handleDeleteMarker }) => {
  const location = {
    longitude: selectedMarker.longitude,
    latitude: selectedMarker.latitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      onBackdropPress={() => setModalVisible(false)}
      backgroundColor="white"
    >
       <TouchableOpacity 
            activeOpacity={1} 
            style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
            className="flex-1 justify-end"
            onPressOut={() => {setModalVisible(false)}}
          >
    {selectedMarker && selectedMarker.soilProperties && (
        <>
      <View>
        <TouchableWithoutFeedback>
        <View className="bg-white mx-2 rounded-t-lg p-9 pt-4 flex">
          <View className="items-end ">
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex mb-6">
                <Text className="font-bold text-lg">Sample Point #{selectedMarker.mapId} Details</Text>
                <Text className="text-xs">View Sampling Point details and location</Text>
          </View>
          <View className="flex items-center justify-center">
            <TouchableWithoutFeedback>
              <MapView
                showsMyLocationButton={false}
                zoomControlEnabled={false}
                showsUserLocation={false}
                scrollEnabled={false}
                // zoomEnabled={true}
                minZoomLevel={15}
                initialRegion={location}
                mapType='terrain'
                style={{ 
                  width: Dimensions.get('window').width*.80, 
                  height: Dimensions.get('window').width*.40
                }}
              >
                <Marker
                  key={selectedMarker.mapId}
                  pinColor={GET_RANDOM_COLOR(selectedMarker)}
                  coordinate={{latitude: selectedMarker.latitude, longitude: selectedMarker.longitude}}
                  // onPress={() => handleMarkerPress(selectedMarker)}
                >
                  {/* <Callout>
                    <View>
                      <Text>Tap here for details</Text>
                    </View>
                  </Callout> */}
                </Marker>
              </MapView>
            </TouchableWithoutFeedback>
          </View>
          <View className="flex my-6">
            <Text className="text-sm leading-6 ">
                {`Latitude:  ${selectedMarker.latitude}\nLongitude:  ${selectedMarker.longitude}`}
            </Text>
          </View>

          <View className="flex ">
            <View className="flex-row mb-4">
                <Text className="font-bold">acidity Level:  </Text>
                <Text>{selectedMarker.soilProperties.acidity}</Text>
            </View>
            
            <View className="flex-row mb-4">
                <Text className="font-bold">Moisture Content:  </Text>
                <Text>{selectedMarker.soilProperties.acidity}</Text>
            </View>

            <Text className="font-bold mb-2">NPK Values</Text>
            <View className="pl-4">
                <Text className="mb-2">Nitrogen:  {selectedMarker.soilProperties.nitrogen}</Text>
                <Text className="mb-2">Phosphorus:  {selectedMarker.soilProperties.phosphorus}</Text>
                <Text className="mb-2">Potassium:  {selectedMarker.soilProperties.potassium}</Text>
            </View>
          </View>

          <View className="flex items-center pt-8 ">
            <Pressable
              onPress={handleDeleteMarker}
              className="bg-gray-50 w-full h-10 items-center justify-center rounded-md flex "
            >
              <Text className=" text-red-400 ">Remove Sampling Point</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </View>
      </>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default HistoryModal;