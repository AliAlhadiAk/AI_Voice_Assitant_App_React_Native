import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Voice from '@react-native-community/voice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Tts from 'react-native-tts';
import tw from 'tailwind-react-native-classnames'; // Add this line for Tailwind styles
import { apiCall } from '../api/openAi'; // Make sure this path is correct
import Features from './Features';



const HomeScreen = () => {
  const [result, setResult] = useState('');
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const scrollViewRef = useRef();

  const speechStartHandler = e => {
    console.log('speech start event', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = e => {
    console.log('speech event: ',e);
    const text = e.value[0];
    setResult(text);
    
  };

  const speechErrorHandler = e=>{
    console.log('speech error: ',e);
  }

  
  const startRecording = async () => {
    setRecording(true);
    Tts.stop(); 
    try {
      await Voice.start('en-GB'); // en-US

    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    
    try {
      await Voice.stop();
      setRecording(false);
      fetchResponse();
    } catch (error) {
      console.log('error', error);
    }
  };
  const clear = () => {
    Tts.stop();
    setSpeaking(false);
    setLoading(false);
    setMessages([]);
  };

  const fetchResponse = async ()=>{
    if(result.trim().length>0){
      setLoading(true);
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);

      // scroll to the bottom of the view
      updateScrollView();

      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages).then(res=>{
        console.log('got api data');
        setLoading(false);
        if(res.success){
          setMessages([...res.data]);
          setResult('');
          updateScrollView();

          // now play the response to user
          startTextToSpeach(res.data[res.data.length-1]);
          
        }else{
          Alert.alert('Error', res.msg);
        }
        
      })
    }
  }



  const updateScrollView = ()=>{
    setTimeout(()=>{
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    },200)
  }

  const startTextToSpeach = message=>{
    if(!message.content.includes('https')){
      setSpeaking(true);
      // playing response with the voice id and voice speed
      Tts.speak(message.content, {
        iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
        rate: 0.5,
      });
    }
  }
  

  const stopSpeaking = ()=>{
    Tts.stop();
    setSpeaking(false);
  }

  useEffect(() => {

    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;
    
    // text to speech events
   
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {console.log('finish', event); setSpeaking(false)});
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    
    
    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);


  return (
   
      <View style={tw`flex-1 bg-white mt-4`}>
        <SafeAreaView style={tw`flex-1 flex mx-5`}>
          <View style={tw`flex-row justify-center`}>
            <Image
              source={require('./bot.png')}
              style={{ height: hp(15), width: hp(15) }}
            />
          </View>
          {messages.length > 0 ? (
            <View style={tw`flex-1` }>
              <Text style={[tw`text-gray-700 font-semibold ml-1`, { fontSize: wp(5) }]}>
                Assistant
              </Text>
              <View style={[{ height: hp(58) }, tw`bg-gray-200 rounded-3xl p-4`]}>
                <ScrollView
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                >
                  {messages.map((message, index) => {
                    if (message.role === "assistant") {
                      if (message.content.includes('https')) {
                        return (
                          <View key={index} style={tw`flex-row justify-start mt-4`}>
                            <View style={tw`p-2 flex rounded-2xl bg-green-100 rounded-tl-none`}>
                              <Image
                                source={{ uri: message.content }}
                                style={[tw`rounded-2xl`, { height: wp(60), width: wp(60) }]}
                                resizeMode='contain'
                              />
                            </View>
                          </View>
                        );
                      } else {
                        return (
                          <View key={index} style={[{ width: wp(70) }, tw`bg-green-100 rounded-xl p-2 mt-4`]}>
                            <Text>{message.content}</Text>
                          </View>
                        );
                      }
                    } else {
                      return (
                        <View key={index} style={tw`flex-row justify-end`}>
                          <View style={[{ width: wp(70) }, tw`bg-white rounded-xl p-2 mt-4`]}>
                            <Text>{message.content}</Text>
                          </View>
                        </View>
                      );
                    }
                  })}
                </ScrollView>
              </View>
            </View>
          ) : (
            <Features />
          )}
          <View style={tw`flex justify-center items-center`}>
            {recording  ? (
              <TouchableOpacity onPress={stopRecording}> 
                <Image
                  source={require('./voiceLoading.gif')}
                  style={[tw`rounded-full`, { height: hp(10), width: hp(10) }]}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <Image
                  source={require('./recordingIcon.png')}
                  style={[tw`rounded-full mt-20`, { height: hp(10), width: hp(10) }]}
                />
              </TouchableOpacity>
            )}
            {
              messages.length > 0 &&(
  
                <TouchableOpacity
                 style={[tw`bg-gray-400 rounded-3xl p-2 absolute right-10 bottom-6` ]}
                 onPress={clear}
                 >
                   <Text style={tw`text-white font-semibold`}>Clear</Text>
                </TouchableOpacity>
              )
            }
            {
              speaking  &&(
  
                <TouchableOpacity
                 style={tw`bg-red-400 rounded-3xl p-2 absolute left-10 bottom-6` }
                 onPress={stopSpeaking}
                 >
                   <Text style={tw`text-white font-semibold`}>Stop</Text>
                </TouchableOpacity>
              )
            }
          </View>
        </SafeAreaView>
      </View>
    );
  }
  
  
  export default HomeScreen;