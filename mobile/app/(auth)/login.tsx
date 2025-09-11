import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  return (
    <SafeAreaView className='bg-blue-800 flex h-screen w-screen gap-6 justify-start items-center flex-col '>
        <View className='mt-10 flex items-center flex-col w-full '>
      <View className='p-6 rounded-full bg-blue-400'>
        <Ionicons name = "phone-portrait-outline" size={50} color={"#ffffff"}/>
      </View>
      <View className='flex items-center flex-col mx-6'>
        <Text className='text-white text-4xl font-sans mt-10 font-bold tracking-wider'>Welcome</Text>
        <Text className='text-gray-200 text-center text-xl font-sans mt-10 font-semibold'>Verify Your Phone Number to Join the ResQwave network and contribute to real time disasters</Text>
      </View>

      <View className="w-screen mx-14 mt-10 rounded-xl">
      <View className="bg-white mx-10 py-2 px-4 rounded-xl flex-row items-center">
        <Text className="text-xl text-gray-500 mr-2">+91</Text>
        <TextInput
          keyboardType="number-pad"
          className="flex-1 text-xl"
        />
      </View>
      <TouchableOpacity className="bg-emerald-500 mt-10 flex items-center py-5 mx-14 rounded-xl">
        <Text className="text-xl text-white font-semibold tracking-wide">
          Send Verification Code
        </Text>
      </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
    
  )
}

export default Login