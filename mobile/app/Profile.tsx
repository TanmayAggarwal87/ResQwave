import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Blue Header */}
      <View className="bg-blue-500 p-4">
        <Text className="text-white text-2xl font-bold text-center">Profile</Text>
      </View>

      <ScrollView className="p-4">
        {/* User Info Card */}
        <View className="bg-white rounded-2xl p-5 shadow-md border border-gray-200 mb-5">
          <View className="flex-row items-center mb-3">
            <View className="w-12 h-12 rounded-full bg-blue-300 justify-center items-center">
              <Text className="text-lg font-bold text-blue-900">RK</Text>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-gray-900">Rajesh Kumar</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="location-outline" size={16} color="#555" />
                <Text className="text-gray-600 text-lg ml-1">Goa, India</Text>
              </View>
              <Text className="text-gray-500 text-md">Joined Jan 2024</Text>
            </View>

            <Text className="text-blue-600 font-bold text-xl">#12</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-between mb-5">
          <View className="flex-1 bg-blue-50 p-4 rounded-xl mx-1">
            <Text className="text-xl font-bold text-blue-700 text-center">23</Text>
            <Text className="text-gray-700 text-center">Total Reports</Text>
          </View>

          <View className="flex-1 bg-green-50 p-4 rounded-xl mx-1">
            <Text className="text-xl font-bold text-green-700 text-center">19</Text>
            <Text className="text-gray-700 text-center">Verified</Text>
          </View>
        </View>

        {/* Accuracy & Points */}
        <View className="flex-row justify-between mb-5">
          <View className="flex-1 bg-purple-50 p-4 rounded-xl mx-1">
            <Text className="text-xl font-bold text-purple-700 text-center">83%</Text>
            <Text className="text-gray-700 text-center">Accuracy</Text>
          </View>

          <View className="flex-1 bg-orange-50 p-4 rounded-xl mx-1">
            <Text className="text-xl font-bold text-orange-600 text-center">1250</Text>
            <Text className="text-gray-700 text-center">Points</Text>
          </View>
        </View>

        {/* Achievements Section */}
        <View className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
          <Text className="text-2xl font-bold text-gray-900 mb-3">Achievements</Text>

          {[
            { title: "First Reporter", desc: "First to report 5 hazards", icon: "ribbon-outline" },
            { title: "Ocean Guardian", desc: "10 verified reports", icon: "shield-checkmark-outline" },
            { title: "Storm Tracker", desc: "Reported 3 storm surges", icon: "flash-outline" },
          ].map((ach, idx) => (
            <View
              key={idx}
              className="flex-row items-center p-3 mb-2 rounded-xl bg-green-50 border border-green-300"
            >
              <Ionicons name={`${ach.icon}`} size={22} color="#16a34a" />
              <View className="ml-3">
                <Text className="text-base font-semibold text-green-800">{ach.title}</Text>
                <Text className="text-sm text-green-700">{ach.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
