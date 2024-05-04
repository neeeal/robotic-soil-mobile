import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, Pressable, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const MarkerModal = ({ modalVisible, setModalVisible, selectedMarker, handleDeleteMarker }) => {
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
          <View className="mb-6">
                <Text className="font-bold text-lg">Sample Point #{selectedMarker.mapId} Details</Text>
                <Text className="text-xs">View Sampling Point details and location</Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm leading-6 ">
                {`Latitude:  ${selectedMarker.latitude}\nLongitude:  ${selectedMarker.longitude}`}
            </Text>
          </View>

          <View>
            <View className="flex-row mb-4">
                <Text className="font-bold">Acidity Level:  </Text>
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

              <View className="items-center pt-8">
                    <Pressable
                      onPress={handleDeleteMarker}
                      className="bg-gray-50 w-full h-10 items-center justify-center rounded-md "
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

export default MarkerModal;