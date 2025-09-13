import { View, Text, ScrollView , Image, TouchableOpacity } from "react-native";
import React from "react";
import Login from "./(auth)/login";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

const index = () => {

  // need to add backend function to fetch in recenbt activities card (includde : title location threat-level how long ago it was posted and desc)
  return (
    <View>
      <ScrollView className="w-full h-full mb-0">
      <SafeAreaView>
        <View className="flex-row justify-between items-center bg-blue-500 px-4 py-3 rounded-xl mx-0 mt-1">
      <View className="flex-row items-center">
        <View className="p-3 bg-blue-400 rounded-full">
          <Ionicons name="analytics-outline" size={28} color="#fff" />
        </View>

        <View className="ml-3">
          <Text className="text-white font-bold text-lg">ResQwave</Text>
          <Text className="text-blue-100 text-xs">
            Ocean Safety Alert System
          </Text>
        </View>
      </View>

      <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
        <Text className="text-blue-600 font-semibold text-sm">EN</Text>
      </TouchableOpacity>
    </View>
        <View className="bg-red-50 rounded-2xl p-4 mx-4 mt-4 shadow">
          <Text className="text-red-600 font-bold mb-2 text-sm">
            ⚠️ URGENT ALERTS
          </Text>

          <View className="bg-white rounded-2xl p-4">
            <View className="flex-row justify-between items-center mb-1">
              <View className="flex-row items-center">
                <Ionicons name="alert-circle" size={22} color="#dc2626" />
                <Text className="ml-2 font-bold text-lg">Oil Spill</Text>
              </View>
              <Text className="bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                Critical
              </Text>
            </View>

            <View className="flex-row items-center mb-2">
              <Ionicons name="location" size={16} color="gray" />
              <Text className="ml-1 text-gray-600 text-sm">
                Goa Coast, Panjim Beach
              </Text>

              <Ionicons name="time" size={16} color="gray" className="ml-4" />
              <Text className="ml-1 text-gray-600 text-sm">2 hours ago</Text>
            </View>
            <Text className="text-gray-700 mb-3">
              Large oil spill detected near fishing area
            </Text>

            <Image
              source={{
                uri: "https://placehold.co/600x400/png",
              }}
              className="w-full h-36 rounded-xl"
            />
          </View>
        </View>

        <View className="mx-3">
          <Text className="mt-4 text-2xl font-bold">Recent Activities</Text>
          <View className=" rounded-2xl p-4 mt-4 shadow">
            <View className="bg-white rounded-2xl p-4">
              <View className="flex-row justify-between items-center mb-1">
                <View className="flex-row items-center">
                  <Ionicons name="warning" size={22} color="#F5BA07" />
                  <Text className="ml-2 font-bold text-lg">Storm Surge</Text>
                </View>
                <Text className="bg-yellow-500 text-white px-2 py-1 text-xs rounded-md">
                  Medium
                </Text>
              </View>

              <View className="flex-row items-center mb-2">
                <Ionicons name="location" size={16} color="gray" />
                <Text className="ml-1 text-gray-600 text-sm">
                  Goa Coast, Panjim Beach
                </Text>

                <Ionicons name="time" size={16} color="gray" className="ml-4" />
                <Text className="ml-1 text-gray-600 text-sm">4 hours ago</Text>
              </View>
              <Text className="text-gray-700 mb-3">
                High tide and strong waves expected
              </Text>

              <Image
                source={{
                  uri: "https://placehold.co/600x400/png",
                }}
                className="w-full h-36 rounded-xl"
              />
            </View>
          </View>
          <View className=" rounded-2xl p-4 mt-4 shadow">
            <View className="bg-white rounded-2xl p-4">
              <View className="flex-row justify-between items-center mb-1">
                <View className="flex-row items-center">
                  <Ionicons name="warning" size={22} color="#F5BA07" />
                  <Text className="ml-2 font-bold text-lg">Storm Surge</Text>
                </View>
                <Text className="bg-yellow-500 text-white px-2 py-1 text-xs rounded-md">
                  Medium
                </Text>
              </View>

              <View className="flex-row items-center mb-2">
                <Ionicons name="location" size={16} color="gray" />
                <Text className="ml-1 text-gray-600 text-sm">
                  Goa Coast, Panjim Beach
                </Text>

                <Ionicons name="time" size={16} color="gray" className="ml-4" />
                <Text className="ml-1 text-gray-600 text-sm">4 hours ago</Text>
              </View>
              <Text className="text-gray-700 mb-3">
                High tide and strong waves expected
              </Text>

              <Image
                source={{
                  uri: "https://placehold.co/600x400/png",
                }}
                className="w-full h-36 rounded-xl"
              />
            </View>
          </View>
        </View>
        

      </SafeAreaView>
      

    </ScrollView>

      <Link href="/Report" asChild>
                <TouchableOpacity
        className="absolute bottom-6 right-6 bg-orange-400 rounded-full p-4 shadow-lg"
        
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
      </Link>          
    
    </View>
    
  );
};

export default index;
