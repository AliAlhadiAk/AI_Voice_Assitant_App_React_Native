import React from 'react';
import { View, Text, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import tw from 'tailwind-react-native-classnames';

const Features = () => {
  return (
    <View style={{ height: hp(60) }}>
      <Text style={[{ fontSize: wp(6.5) }, tw`font-semibold text-gray-700`]}>Features</Text>
      <View style={[tw`p-4 rounded-xl bg-green-200`, { marginTop: hp(4) }]}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={require('./chatgptIcon.png')}
            style={{ height: hp(4), width: hp(4), marginRight: wp(2) }} // Adjusted width and added margin for spacing
            resizeMode="contain" // Adjust resizeMode as per your icon requirement
          />
          <Text style={[tw`font-semibold text-gray-700`, { fontSize: wp(4.8) }]}>ChatGPT</Text>
        </View>
        <Text style={[tw`text-gray-700 font-medium `,{fontSize:wp(3.8),paddingTop:hp(1)}]}>
            ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on wide range of topics
        </Text>
      </View>
      <View style={[tw`p-4 rounded-xl bg-purple-200 `, { marginTop: hp(2) }]}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={require('./dalleIcon.png')}
            style={{ height: hp(4), width: hp(4), marginRight: wp(2) }} // Adjusted width and added margin for spacing
            resizeMode="contain" // Adjust resizeMode as per your icon requirement
          />
          <Text style={[tw`font-semibold text-gray-700`, { fontSize: wp(4.8) }]}>DALL-E</Text>
        </View>
        <Text style={[tw`text-gray-700 font-medium `,{fontSize:wp(3.8),paddingTop:hp(1)}]}>
            DALL-E can generate imaginative and diverse images from texttual descriptions expanding the boundaries of visual creativity
        </Text>
      </View>
      <View style={[tw`p-4 rounded-xl bg-blue-200`, { marginTop: hp(2) }]}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={require('./smartaiIcon.png')}
            style={{ height: hp(4), width: hp(4), marginRight: wp(2) }} // Adjusted width and added margin for spacing
            resizeMode="contain" // Adjust resizeMode as per your icon requirement
          />
          <Text style={[tw`font-semibold text-gray-700`, { fontSize: wp(4.8) }]}>Smart AI</Text>
        </View>
        <Text style={[tw`text-gray-700 font-medium `,{fontSize:wp(3.8),paddingTop:hp(1)}]}>
            A powerful voice assistant with abilities of ChatGPT and Dall-E, providing you the best of both worlds
        </Text>
      </View>
    </View>
  );
};

export default Features;
