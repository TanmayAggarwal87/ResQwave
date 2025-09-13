import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const safetyTips:any = {
  "Oil Spill": [
    "Avoid contact with the water or shoreline.",
    "Keep pets and children away from contaminated areas.",
    "Report any wildlife covered in oil to local authorities.",
    "Use protective gloves if you must handle anything from the water."
  ],
  "Dead Fish/Red Tide": [
    "Do not swim or fish in affected areas.",
    "Avoid collecting or eating dead fish or shellfish.",
    "Wear a mask if the smell is too strong — it can irritate your lungs.",
    "Report sightings to the local environmental department."
  ],
  "Stranded Animal": [
    "Do not touch or push the animal back into the water.",
    "Keep a safe distance and keep crowds away.",
    "Call local rescue services or wildlife authorities.",
    "Take photos from a distance to report accurately."
  ],
  "Storm Surge": [
    "Move to higher ground immediately.",
    "Avoid driving or walking through flooded areas.",
    "Stay updated through official weather alerts.",
    "Have an emergency kit with essentials ready."
  ],
  "Illegal Fishing": [
    "Do not confront the fishermen directly.",
    "Take photos or videos safely from a distance.",
    "Note the location and time for reporting.",
    "Inform the coast guard or local fisheries department."
  ]
};

const SafetyTips = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-500 p-4">
        <Text className="text-white text-2xl font-bold text-center">
          Safety Tips
        </Text>
      </View>

      <ScrollView className="p-4">
        {Object.keys(safetyTips).map((key) => (
          <View
            key={key}
            className="mb-4 border border-gray-300 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Accordion Header */}
            <Pressable
              className="flex-row  justify-between items-center bg-blue-100 p-4"
              onPress={() => toggleExpand(key)}
            >
              <Text className="text-xl font-semibold text-blue-900">{key}</Text>
              <Ionicons
                name={expanded === key ? "chevron-up" : "chevron-down"}
                size={20}
                color={"#1e3a8a"}
              />
            </Pressable>

            {/* Accordion Content */}
            {expanded === key && (
              <View className="bg-white px-4 py-3">
                {safetyTips[key].map((tip:any, idx:any) => (
                  <Text key={idx} className="text-lg text-gray-700 mb-2">
                    • {tip}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SafetyTips;
