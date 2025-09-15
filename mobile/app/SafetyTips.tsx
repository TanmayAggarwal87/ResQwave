import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/store/useLanguageStore";

const SafetyTips = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const toggleExpand = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  // ✅ Translate titles & tips dynamically
  const safetyTips:any = {
    "oil_spill": t("oil_spill_tips", { returnObjects: true }),
    "dead_fish": t("dead_fish_tips", { returnObjects: true }),
    "stranded_animal": t("stranded_animal_tips", { returnObjects: true }),
    "storm_surge": t("storm_surge_tips", { returnObjects: true }),
    "illegal_fishing": t("illegal_fishing_tips", { returnObjects: true }),
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-500 p-4">
        <Text className="text-white text-2xl font-bold text-center">
          {t("safety_tips")}
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
              className="flex-row justify-between items-center bg-blue-100 p-4"
              onPress={() => toggleExpand(key)}
            >
              <Text className="text-xl font-semibold text-blue-900">
                {t(`${key}_title`)} {/* ✅ Translate title */}
              </Text>
              <Ionicons
                name={expanded === key ? "chevron-up" : "chevron-down"}
                size={20}
                color={"#1e3a8a"}
              />
            </Pressable>

            {/* Accordion Content */}
            {expanded === key && (
              <View className="bg-white px-4 py-3">
                {safetyTips[key].map((tip: string, idx: number) => (
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
