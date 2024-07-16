import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 justify-around bg-white`}>
      <View style={tw`justify-center`}>
        <Text style={[tw`text-center  font-bold text-gray-700`, { fontSize: wp(10) }]}>
          Jarvis
        </Text>
        <Text style={tw`text-center text-gray-600 font-semibold`}>
          The Future is here, powered by AI
        </Text>
      </View>
      <View style={tw`flex-row justify-center`}>
        <Image
          source={require('./welcome.png')}
          style={[
            tw`h-72`, // Tailwind CSS height class
            { height: hp(75), width: wp(75) } // Responsive height and width using hp and wp
          ]}
          resizeMode="contain" // Adjust resizeMode as per your image requirement
        />
      </View>
      <TouchableOpacity style={tw`bg-green-600 mx-5 p-4 rounded-2xl`} onPress={() => navigation.navigate('Home')}> 
        <Text style={[tw`text-center font-bold text-white text-2xl`, { fontSize: wp(6) }]}>
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
