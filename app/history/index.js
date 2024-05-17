import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Iconify } from 'react-native-iconify';
import HistoryModal from '../../components/modals/history.js';
import { GET_MARKER, DELETE_MARKER } from '../../helpers/API';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(-1);  // Make sure to set this from somewhere, like user session
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (!hasMore || isFetching) return;

    setIsFetching(true);
    const data = await GET_MARKER(userId, page);
    setIsFetching(false);

    if (data && data.length > 0) {
      let newEntries = data.map(markerData => ({
        mapId: markerData.mapId,
        latitude: markerData.latitude,
        longitude: markerData.longitude,
        soilProperties: {
          moisture: String(markerData.moisture),
          acidity: String(markerData.acidity),
          nitrogen: String(markerData.nitrogen),
          phosphorus: String(markerData.phosphorus),
          potassium: String(markerData.potassium),
        },
        date: markerData.dateAdded
      }));
      
      // console.log("here", history.length, page)
      if(history.length !== 0){
        newEntries = newEntries.filter(newEntry => !history.some(entry => entry.mapId === newEntry.mapId));
      }

      setHistory(prevHistory => [...prevHistory, ...newEntries]);
      setPage(prevPage => prevPage + 1);
    } else {
      setHasMore(false);
    }
  };

  const handleItemPress = (item) => {
    setSelectedMarker(item);
    setModalVisible(true);
  };

  async function handleDeleteMarker() {
    const result = await DELETE_MARKER(selectedMarker.mapId);
    if (result.ok) {  // Assume DELETE_MARKER returns some status
      const updatedMarkers = history.filter((marker) => marker.mapId !== selectedMarker.mapId);
      setHistory(updatedMarkers);
    }
    setModalVisible(false);
  };

  const handleRefreshPress = () => {
    console.log("starting",page,history.length)
    setHistory([]);
    setPage(1); 
    setHasMore(true);
    // setIsFetching(false);
    fetchData();
    console.log("ending",page,history.length)
  } 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ flexDirection: 'row', padding: 16, backgroundColor: '#fff' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>Tap on previous samples to view details</Text>
        </View>
        <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => handleRefreshPress()}>
          <Iconify icon="mage:reload" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)} style={{ padding: 16, marginHorizontal: 16, marginTop: 16, backgroundColor: '#fff', borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Iconify icon="mdi:location" size={28} color="#878532" />
              <View style={{ paddingLeft: 16 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Sampling Point # {item.mapId}</Text>
                <Text style={{ fontWeight: 'bold' }}>Location: <Text style={{ fontWeight: 'normal' }}>{item.longitude}, {item.latitude}</Text></Text>
              </View>
              <Iconify icon="formkit:right" size={20} color="black" style={{ marginLeft: 'auto' }} />
            </View>
            <Text style={{ textAlign: 'right', color: '#aaa', fontSize: 12 }}>{item.date}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.mapId.toString()}
        ListFooterComponent={() => (isFetching ? <Text>Loading more...</Text> : null)}
      />
      {modalVisible && (
        <HistoryModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedMarker={selectedMarker}
          handleDeleteMarker={handleDeleteMarker}
          showMap={true}
        />
      )}
    </SafeAreaView>
  );
}
