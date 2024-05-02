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

              <View style={styles.buttonContainer}>
                    <Pressable
                      style={[styles.button, styles.buttonDelete]}
                      onPress={handleDeleteMarker}
                    >
                      <Text style={styles.textStyle}>Delete Marker</Text>
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

const styles = StyleSheet.create({
  modalClose: {
    alignItems: 'flex-end'
  },
  container: {
    flex: 1,
  },
  fixedContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalContainer: { // flex flex-end mh-10
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  modalContent: {
    backgroundColor: '#FEFEFEEF', // Adjust the color to match the theme
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    paddingTop:10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // elevation: 5,
  },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },

  textStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalDetailText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000', // Adjust text color to match the theme
  },

  buttonDelete: {
    backgroundColor: '#D32F2F',
    marginTop: 20,
  },

  image:{
    border: 1,
    width: 100,
    height: 100
  },

  inputField:{
    paddingHorizontal:2
  },

  buttonContainer:{
    border:1
  },

  buttonSave: {
    border:1
  },

  buttonCancel:{
    border:1
  },
  propertyContainer: {
    marginBottom: 10,
  },
  editedValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#AB9790',
    borderRadius: 10,
    padding: 10,
  },

  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  labelText: {
    fontWeight: 'bold',
    marginRight: 5,
  }
});

export default MarkerModal;