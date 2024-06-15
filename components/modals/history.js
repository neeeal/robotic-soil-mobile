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
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="px-2">
              <TouchableWithoutFeedback>
                <KeyboardAvoidingView behavior="padding" className="flex">
                  <View style={{ backgroundColor: 'white', margin: 12, borderRadius:10, padding: 9, paddingTop: 4, flex: 1, maxHeight: '96%' }}>
                      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}  className=" items-end pr-2 py-2">
                        <AntDesign name="close" size={24} color="black" />
                      </TouchableOpacity>
                      {showMap && (
                        <TouchableWithoutFeedback className="rounded-md">
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
                          
                          <View className="flex-col justify-items-end ">
                            <Text className="text-xs text-gray-500 flex flex-grow">{selectedMarker.date}</Text>
                            {/* <Text className="text-xs text-gray-500 flex flex-shrink">{`${selectedMarker.latitude},${selectedMarker.longitude}`}</Text> */}
                          </View>
                          </View>

                        <View className="mb-2 flex flex-row">
                          <Text className="text-sm flex-1 font-bold">
                            {`Lat/Long:  `}
                          </Text>
                          <Text className="text-sm flex-1">
                            {`${selectedMarker.latitude},${selectedMarker.longitude}`}
                          </Text>
                        </View>

                        <View className="mb-2 flex-row">
                          <Text className=" font-bold flex-1">Acidity Level:  </Text>
                          <Text className="flex-1">{selectedMarker.soilProperties.acidity} <Text style={{color: getColor(selectedMarker.interpretations.acidity)}}>({selectedMarker.interpretations.acidity})</Text> </Text>
                        </View>

                        <View className="mb-2 flex-row">
                          <Text className="font-bold flex-1">Moisture Content:  </Text>
                          <Text className="flex-1">{selectedMarker.soilProperties.moisture}%  </Text>
                        </View>

                        <View className="mb-2 flex-row">
                            <Text className="font-bold flex-1">Texture:</Text>
                            <Text className="flex-1">{selectedMarker.interpretations.texture}</Text>
                        </View>

                        <Text className="font-bold">NPK Values</Text>
                        <View className="pl-6">
                          <View className="flex-row">
                            <Text className="flex-1">Nitrogen:</Text>
                            <Text className="flex-1">{selectedMarker.soilProperties.nitrogen} <Text className="text-gray-500 ">({selectedMarker.interpretations.nitrogen})</Text></Text>
                          </View>

                          <View className="flex-row">
                            <Text className="flex-1">Phosphorus:</Text>
                            <Text className="flex-1">{selectedMarker.soilProperties.phosphorus} <Text className="text-gray-500 ">({selectedMarker.interpretations.phosphorus})</Text></Text>
                          </View>

                          <View className="flex-row">
                            <Text className="flex-1">Potassium:</Text>
                            <Text className="flex-1">{selectedMarker.soilProperties.potassium} <Text className="text-gray-500 ">({selectedMarker.interpretations.potassium})</Text></Text>
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
                      <View className="p-2 pb-6 mb-3  align-middle flex flex-1 ">
                        <Pressable
                          onPress={handleDeleteMarker}
                          style={{ backgroundColor: '#f8f8f8', width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                        >
                          <Text style={{ color: 'red' }}>Remove Sampling Point</Text>
                        </Pressable>
                      </View>
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default HistoryModal;
