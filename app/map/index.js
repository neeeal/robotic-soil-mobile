import React, { useState, useEffect } from 'react';
// import { Image } from 'expo-image';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView, Dimensions, Modal, Pressable } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
// import { AntDesign } from '@expo/vector-icons';
import { Iconify } from 'react-native-iconify';
// import site_sample from './assets/site_sample.png';
import MarkerModal from '../../components/modals/marker'; 
import { GET_BASE_URL } from '../../helpers/utils'
const baseUrl = GET_BASE_URL(); 

const MapPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [soilProperties, setSoilProperties] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    acidity: 0,
    moisture: 0,
  });
  const [userId, setUserId] = useState(-1)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
  
      const data = await getMarkers(userId); // Await the function call

      console.log("data", data)
  
      // Check if data is valid before processing it further
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          // console.log(i)
          const entry = {
            mapId: data[i].mapId,
            latitude: data[i].latitude,
            longitude: data[i].longitude,
            soilProperties: {
              moisture: String(data[i].moisture),
              acidity: String(data[i].acidity),
              nitrogen: String(data[i].nitrogen),
              phosphorus: String(data[i].phosphorus),
              potassium: String(data[i].potassium)
            }
          };
          setMarkers(prevMarkers => [...prevMarkers, entry]);
        }
      } else {
        console.error('Invalid data received:', data);
      }
    })();
  }, []); 
  

  async function handleMapPress (event) {
    const { coordinate } = event.nativeEvent;
    const randomSoilProperties = generateRandomSoilProperties();
    const mapId = String(14.626).replace('.','_').slice(0,)+ '_' + String(14.626)
                      .replace('.','_').slice(0,8) + '_' + Math.floor(Math.random() * 10000)
                      

    const result = await storeMarker(mapId, userId, coordinate, randomSoilProperties);
    setMarkers([...markers, { mapId:mapId, ...coordinate, soilProperties: randomSoilProperties }]);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
    setEditedNitrogen(marker.soilProperties.nitrogen);
    setEditedPhosphorus(marker.soilProperties.phosphorus);
    setEditedPotassium(marker.soilProperties.potassium);
    setEditedAcidity(marker.soilProperties.acidity);
    setEditedMoisture(marker.soilProperties.moisture);
    setEditedType(marker.soilProperties.soilType);
    setEditedImage(marker.soilProperties.image);
    setEditMode(false);
  };

  const generateRandomSoilProperties = () => {
    return {
      nitrogen: (Math.random() * 10).toFixed(2),
      phosphorus: (Math.random() * 10).toFixed(2),
      potassium: (Math.random() * 10).toFixed(2),
      acidity: (Math.random() * 14).toFixed(2),
      moisture: `${(Math.random() * 100).toFixed(2)}%`,
      soilType: 'silt',
      image: "none"
    };
  };
  

  async function handleDeleteMarker () {
    const updatedMarkers = markers.filter((marker) => marker.mapId !== selectedMarker.mapId);
    result = await deleteMarker(selectedMarker.mapId)
    setMarkers(updatedMarkers);
    setModalVisible(false);
  };
  
  // const convertImageToBase64 = async (imageUri) => {
  //   const response = await fetch(imageUri);
  //   const blob = await response.blob();
  //   const base64Image = await convertBlobToBase64(blob);
  //   return base64Image;
  // };

  // const convertBlobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(',')[1]);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // const fetchProperties = async () => {
  //   try {
  //     // const base64Image = await convertImageToBase64(imageUri)
  //     console.log("LOADING LOADING LOADING...")
  //     // console.log(base64Image)
  //     const response = await fetch('https://soilpd-2024.up.railway.app/api/analysis/get_analysis', { 
  //     method: 'GET',
  //     body: JSON.stringify({
  //         "userId":-1,
  //       }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //     console.log("working2")
  //     const result = await response.json();
  //     // result assign to state
  //     console.log("working3")
  //     console.log(result)
  //   } catch (error) {
  //     // console.log(error)
  //   }
  // };

  async function deleteMarker(mapId){
    const apiUrl = baseUrl+'analysis/'+mapId;

    // Make a DELETE request using the Fetch API
    const data = await fetch(apiUrl,{
      method: 'DELETE',
      headers: { 
        'Content-type': 'application/json' 
      },
      // body: JSON.stringify({ "userId": userId })
      })
      .then(response => {
        if (!response.ok) {
          // console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        // Process the retrieved user data
        console.log('msg:', response.msg);
        // console.log("analysis:", response.analysis);
        return response.analysis
      })
      .catch(error => {
        console.error('Error:', error);
        // Log the response for more information
        console.log('Response:', error);
        // console.log('body:', response);
      });

      if(!data){
        return false
      }

      return data
  }

  async function getMarkers(userId){
    // Specify the API endpoint for user data
    const apiUrl = "http://192.168.254.102:5000/api/analysis/-1";
    console.log(apiUrl)

    // Make a GET request using the Fetch API
    const data = await fetch(apiUrl,{
      method: 'GET',
      headers: { 
        'Content-type': 'application/json' 
      },
      // body: JSON.stringify({ "userId": userId })
      })
      .then(response => {
        if (!response.ok) {
          // console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        // Process the retrieved user data
        console.log('msg:', response.msg);
        // console.log("analysis:", response.analysis);
        return response.analysis
      })
      .catch(error => {
        console.error('Error:', error);
        // Log the response for more information
        console.log('Response:', error);
        // console.log('body:', response);
      });

      if(!data){
        return false
      }

      return data
  }

  async function storeMarker(mapId, userId,coordinates,properties){
    // Specify the API endpoint for user data
    const apiUrl = baseUrl+'analysis/store/'+userId;
    console.log(apiUrl)
    
    // console.log({...coordinates, ...properties})
    // properties.image = 
    // console.log("PASSED")

    const toStore = { mapId:mapId, ...coordinates, ...properties }
    console.log(toStore)

    // Make a GET request using the Fetch API
    const data = await fetch(apiUrl,{
      method: 'POST',
      headers: { 
        'Content-type': 'application/json' 
      },
      body: JSON.stringify(toStore)
      })
      .then(response => {
        if (!response.ok) {
          // console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        // Process the retrieved user data
        console.log('msg:', response.msg);
        // console.log("analysis:", response.analysis);
        return {msg: "Store success", data: toStore}
      })
      .catch(error => {
        console.error('Error:', error);
        // Log the response for more information
        console.log('Response:', error);
        // console.log('body:', response);
      });

      if(!data){
        return false
      }

      return data
  }

  async function handleUpdateMarker() {
  
    setEditedNitrogen('');
    setEditedPhosphorus('-1');
    setEditedPotassium('-1');
    setEditedAcidity('-1');
    setEditedMoisture('-1');
    setEditedType('clay');
    setEditedImage('none');
  
    const entries = {
      nitrogen: editedNitrogen,
      phosphorus: editedPhosphorus,
      potassium: editedPotassium,
      acidity: editedAcidity,
      moisture: editedMoisture,
      type: editedType,
      image: editedImage
    };

    const keys = Object.keys(entries);
    for (let i = 0; i < keys.length; i++) {
      console.log(entries[keys[i]]);
      if (entries[keys[i]] === '') {
        delete entries[keys[i]];
      }
    }

    const result = await updateMarker(selectedMarker.mapId, entries);
  
    console.log(selectedMarker);

  
    if (result) {
      setSelectedMarker((prevMarker) => ({
        ...prevMarker,
        soilProperties: entries,
      }));
      setMarkers((prevMarkers) => {
        const updatedMarkers = prevMarkers.map((marker) =>
          marker.mapId === selectedMarker.mapId
            ? { ...marker, soilProperties: entries }
            : marker
        );
        return updatedMarkers;
      });
      setEditMode(false); // Exit edit mode after saving
    } else {
      console.log("Failed to update marker.");
    }
  
    return selectedMarker;
  }

  function handleCancelEdit() {
    // Restore original values when canceling edit mode
    setEditedNitrogen(selectedMarker.soilProperties.nitrogen);
    setEditedPhosphorus(selectedMarker.soilProperties.phosphorus);
    setEditedPotassium(selectedMarker.soilProperties.potassium);
    setEditedAcidity(selectedMarker.soilProperties.acidity);
    setEditedMoisture(selectedMarker.soilProperties.moisture);
    setEditedType(selectedMarker.soilProperties.soilType);
    setEditMode(false); // Exit edit mode without saving
  }
  

  async function updateMarker(mapId, entries){
    // Specify the API endpoint for user data
    const apiUrl = baseUrl+'analysis/update/'+mapId;

    // Make a GET request using the Fetch API
    const data = await fetch(apiUrl,{
      method: 'PUT',
      headers: { 
        'Content-type': 'application/json' 
      },
      body: JSON.stringify(entries)
      })
      .then(response => {
        if (!response.ok) {
          // console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        // Process the retrieved user data
        console.log('msg:', response.msg);
        // console.log("analysis:", response.analysis);
        return {msg: "Store success", data: entries}
      })
      .catch(error => {
        console.error('Error:', error);
        // Log the response for more information
        console.log('Response:', error);
        // console.log('body:', response);
      });

      if(!data){
        return false
      }

      return data
  }


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
              showsUserLocation={true}
              style={styles.map}
              onPress={handleMapPress}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker}
                  onPress={() => handleMarkerPress(marker)}
                >
                  <Callout>
                    <View>
                      <Text style={styles.calloutText}>Tap here for details</Text>
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

const styles = StyleSheet.create({
  modalClose: {
    alignItems: 'flex-end'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 'full'
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

export default MapPage;
