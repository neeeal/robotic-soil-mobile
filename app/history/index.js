import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView } from 'react-native'; // Import necessary components
import { Iconify } from 'react-native-iconify';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([
      { 
        id: 1, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }  
      },
      { 
        id: 2, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        id: 3, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        id: 4, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        id: 5, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        id: 6, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        id: 7, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        id: 8, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
      { 
        id: 9, 
        location: { longitude: 1.0, latitude: 1.0 }, 
        date:"Thu, May 1, 2024 13:39",
        soil_properties: { nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0 }
      },
    ]);
  }, []);

  return (
    <SafeAreaView className="flex flex-1 h-full w-full bg-slate-100 ">
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <View className="flex p-4 mx-4 mt-4 bg-white rounded-md">
              <View className="flex-1 flex-row w-full max-h-20">
                <View className="flex-2">
                  <Iconify icon="mdi:location" size={28} color="#878532" />
                </View>
                <View className="flex-2 px-4 ">
                  <Text className="font-bold text-lg">Sampling Point # {item.id}</Text>
                  <Text className="font-bold">Location: 
                    <Text className="font-normal"> {item.location.longitude}, {item.location.latitude}</Text>
                  </Text>
                </View>
                <View className="flex-1 items-end">
                  <TouchableOpacity className="p-1 -mt-1">
                    <Iconify icon="material-symbols:chevron-right" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-1 items-end px-8">
                <Text>{item.date}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
    </SafeAreaView>
  );
}
