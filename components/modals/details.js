import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, Pressable, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const Details = ({ modalVisible, setModalVisible, selectedMarker, handleUpdateMarker, handleDeleteMarker }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  const handleEditPress = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleInputChange = (key, value) => {
    setEditedValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      onBackdropPress={() => setModalVisible(false)}
    >
       <TouchableOpacity 
            // style={styles.container} 
            activeOpacity={1} 
            style={styles.modalContainer}
            onPressOut={() => {setModalVisible(false)}}
          >
      <View 
      >
              <TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <View style={styles.modalClose}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.propertyContainer}>
            {selectedMarker
              ? `Latitude: ${selectedMarker.latitude}\nLongitude: ${selectedMarker.longitude}`
              : ''}
          </Text>
          {selectedMarker && selectedMarker.soilProperties && (
            <>
              {Object.entries(selectedMarker.soilProperties).map(([key, value]) => (
                <View key={key} style={styles.propertyContainer}>
                  {key !== 'image' && (
                    <>
                      {editMode && (
                        <View style={styles.editedValueContainer}>
                          <Text style={styles.labelText}>{key}:</Text>
                          <TextInput
                            style={styles.inputField}
                            placeholder={value.toString()}
                            value={editedValues[key] || value.toString()}
                            onChangeText={(text) => handleInputChange(key, text)}
                          />
                        </View>
                      )}
                      {!editMode && (
                        <View style={styles.displayContainer}>
                          <Text style={styles.labelText}>{key}:</Text>
                          <Text style={styles.displayText}>{value.toString()}</Text>
                        </View>
                      )}
                    </>
                  )}
                </View>
              ))}

              <View style={styles.buttonContainer}>
                {!editMode && (
                  <>
                    <Pressable
                      style={[styles.button]}
                      onPress={handleEditPress}
                    >
                      <Text style={styles.textStyle}>Edit</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonDelete]}
                      onPress={handleDeleteMarker}
                    >
                      <Text style={styles.textStyle}>Delete Marker</Text>
                    </Pressable>
                  </>
                )}

                {editMode && (
                  <>
                    <Pressable
                      style={[styles.button, styles.buttonSave]}
                      onPress={() => handleUpdateMarker(editedValues)}
                    >
                      <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonCancel]}
                      onPress={handleCancelEdit}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      </View>
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
  modalContainer: {
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

export default Details;