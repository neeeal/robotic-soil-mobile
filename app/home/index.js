import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { useNavigation } from '@react-navigation/native';

export default function Root() {
    const navigation = useNavigation(); 

    const goToMapPage = () => {
      navigation.navigate('map/index'); 
    };
    return (
        <View className="flex-col h-full">
            <ImageBackground
            source={require('../../assets/images/landing.png')} 
            className="flex-row"
        >
            <View className="mx-16 mt-24 mb-24 ">
                <View className="flex">
                    <Iconify icon="material-symbols:landscape-outline-rounded" size={70} color="white" />
                </View>
                <View className="flex-2">
                    <Text className="text-white text-2xl font-bold">SOIL NUTRIENT</Text>
                    <Text style={{color:"#FFCA64"}} className="text-2xl font-bold">MAPPING APP</Text>
                    <Text className="text-white text-xs">A mobile application that can map the nutrients (pH level, moisture content, and NPK values) using the soil robot collector.</Text>
                </View>
                <View className="flex justify-center mt-8">
                        <TouchableOpacity onPress={goToMapPage} style={{backgroundColor:"#878532"}} className="w-full py-3 rounded-lg items-center justify-center">
                            <Text className="text-white">Go to Map</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
        <View className="flex-1 py-4">
            <View className="mx-16 mb-16 mt-6 flex-1">
                <View className="flex">
                    <Text style={{color:"#432E13"}} className="text-lg leading-5 font-bold">Check out the nutrients with our soil robot collector</Text>
                </View>
                <View>
                    <View className="pt-4 flex-row justify-between">
                        <Image source={require('../../assets/images/pH level.png')}/>
                        <Text className="flex-1 pl-4 text-xs">pH level</Text>
                        <Image source={require('../../assets/images/Vector.png')}/>
                    </View>
                    <View className="py-2 flex-row justify-between">
                        <Image source={require('../../assets/images/moisture content.png')}/>
                        <Text className="flex-1 pl-4 text-xs">Moisture</Text>
                        <Image source={require('../../assets/images/Vector.png')}/>
                    </View>
                    <View className="pb-2 flex-row justify-between">
                        <Image source={require('../../assets/images/npk 1.png')}/>
                        <Text className="flex-1 pl-4 text-xs">NPK</Text>
                        <Image source={require('../../assets/images/Vector.png')}/>
                    </View>
                    <View className="pb-4 flex-row justify-between">
                        <Image className="w-5 h-6" source={require('../../assets/images/texture 2.png')}/>
                        <Text className="flex-1 pl-4 text-xs">Texture</Text>
                        <Image source={require('../../assets/images/Vector.png')}/>
                    </View>
                </View>
                <View className="flex">
                    <Text className="text-sm font-bold">Map the nutrients using our soil robot collector</Text>
                </View>
            </View>
        </View>
        </View>
    )
}

