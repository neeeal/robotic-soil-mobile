// Import Image from react-native
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, Pressable, ScrollView, Dimensions, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { GET_RANDOM_COLOR } from '../../helpers/utils';

const HistoryModal = ({ modalVisible, setModalVisible, selectedMarker, handleDeleteMarker, showMap }) => {
  const location = {
    longitude: selectedMarker.longitude,
    latitude: selectedMarker.latitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const getColor = (interpretation) => {
    const word = interpretation.toLowerCase();
    if ( word === 'high' || word === 'alkaline') {
      return '#ff5252';
    } else if (word === 'normal' || word === 'neutral') {
      return '#809c13';
    } else if (word === 'low' || word === 'acidic') {
      return '#cca3ff';
    } else {
      return 'black';
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableOpacity 
        activeOpacity={1} 
        style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
        className="flex-1 justify-end"
        onPressOut={() => {setModalVisible(false)}}
      >
        {selectedMarker && selectedMarker.soilProperties && (
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', margin: 12, borderRadius:10, padding: 9, paddingTop: 4, flex: 1, maxHeight: '96%' }}>
                  <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="px-4">
                    <View style={{ alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <AntDesign name="close" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                    {showMap && (
                      <TouchableWithoutFeedback style={{ borderRadius: 10}}>
                        <MapView
                          provider={PROVIDER_GOOGLE}
                          showsMyLocationButton={false}
                          zoomControlEnabled={false}
                          showsUserLocation={false}
                          scrollEnabled={false}
                          initialRegion={location}
                          minZoomLevel={16}
                          maxZoomLevelZoomLevel={16}
                          mapType='terrain'
                          style={{ 
                            width: Dimensions.get('window').width * 0.80, 
                            height: Dimensions.get('window').width * 0.80,
                          }}
                        >
                          <Marker
                            key={selectedMarker.mapId}
                            pinColor={GET_RANDOM_COLOR(selectedMarker)}
                            coordinate={{latitude: selectedMarker.latitude, longitude: selectedMarker.longitude}}
                          />
                        </MapView>
                      </TouchableWithoutFeedback>
                    )}
                    <View className="p-4 my-4  bg-slate-50" style={{ borderRadius: 10}}>
                      <View className="pb-2 mb-2 border-b-gray-200 border-b-2 ">
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Sample Point #{selectedMarker.mapId}</Text>
                        <Text className="text-xs">{selectedMarker.address}</Text>
                        <Text className="text-xs text-gray-500">{selectedMarker.date}</Text>
                      </View>

                      <View className="mb-2 flex flex-row">
                        <Text className="text-sm flex-1">
                          {`Latitude:  ${selectedMarker.latitude}`}
                        </Text>
                        <Text className="text-sm flex-1">
                          {`Longitude:  ${selectedMarker.longitude}`}
                        </Text>
                      </View>

                      <View className="mb-2 flex-row">
                        <Text className=" font-bold flex-1">Acidity Level:  </Text>
                        <Text className="flex-1">{selectedMarker.soilProperties.acidity} <Text style={{color: getColor(selectedMarker.interpretations.acidity)}}>({selectedMarker.interpretations.acidity})</Text> </Text>
                      </View>

                      <View className="mb-2 flex-row">
                        <Text className="font-bold flex-1">Moisture Content:  </Text>
                        <Text className="flex-1">{selectedMarker.soilProperties.moisture}  </Text>
                      </View>

                      <Text className="font-bold">NPK Values</Text>
                      <View className="pl-6">
                        <View className="flex-row">
                          <Text className="flex-1">Nitrogen:</Text>
                          <Text className="flex-1">{selectedMarker.soilProperties.nitrogen} </Text>
                        </View>

                        <View className="flex-row">
                          <Text className="flex-1">Phosphorus:</Text>
                          <Text className="flex-1">{selectedMarker.soilProperties.phosphorus} </Text>
                        </View>

                        <View className="flex-row">
                          <Text className="flex-1">Potassium:</Text>
                          <Text className="flex-1">{selectedMarker.soilProperties.potassium} </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <View>
                        <Image 
                          source={{ uri: `data:image/png;base64,${selectedMarker.image}` }}
                          style={{ borderRadius: 10, width: Dimensions.get('window').width * 0.80, height: Dimensions.get('window').width * 0.80 }}
                        />
                      </View>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: 8 }}>
                      <Pressable
                        onPress={handleDeleteMarker}
                        style={{ backgroundColor: '#f8f8f8', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                      >
                        <Text style={{ color: 'red' }}>Remove Sampling Point</Text>
                      </Pressable>
                    </View>
                  </ScrollView>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default HistoryModal;
