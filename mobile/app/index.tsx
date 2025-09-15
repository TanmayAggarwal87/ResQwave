import i18n from "../i18n";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Pressable, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../store/useLanguageStore";
import cn from "clsx";
import axios from "axios";
import { axiosInstance } from "@/libs/axios";

const Index = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const availableLanguages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "mr", label: "मराठी" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "be", label: "বাংলা" },
  ];

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.get("/reports/get");
        setReports(res.data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <View>
      <ScrollView className="w-full h-full mb-0">
        <SafeAreaView>
          {/* ---------- HEADER ---------- */}
          <View className="flex-row flex-1 justify-between items-center bg-blue-500 px-4 py-3 rounded-xl mx-0 mt-1">
            <View className="flex-row items-center">
              <View className="p-3 bg-blue-400 rounded-full">
                <Ionicons name="analytics-outline" size={28} color="#fff" />
              </View>
              <View className="ml-3">
                <Text className="text-white font-bold text-lg">ResQwave</Text>
                <Text className="text-blue-100 text-xs">{t("app_subtitle")}</Text>
              </View>
            </View>

            <TouchableOpacity
              className="bg-white px-4 py-2 rounded-full"
              onPress={() => setModalVisible(true)}
            >
              <Text className={cn("text-blue-600 font-semibold text-sm")}>
                {availableLanguages.find((l) => l.code === language)?.label || "EN"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ---------- LANGUAGE SELECTOR MODAL ---------- */}
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              className="flex-1 bg-black/40 justify-center items-center"
              onPress={() => setModalVisible(false)}
            >
              <View className="bg-white rounded-2xl p-4 w-72 shadow-lg">
                <Text className="text-lg font-bold text-center mb-4">{t("choose_language")}</Text>
                {availableLanguages.map((lang) => (
                  <TouchableOpacity
                    key={lang.code}
                    className="p-3 border-b border-gray-200"
                    onPress={() => changeLanguage(lang.code)}
                  >
                    <Text
                      className={`text-center text-lg ${
                        language === lang.code ? "font-bold text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {lang.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>

          {/* ---------- REPORTS FEED ---------- */}
          <View className="mx-4 mt-4">
            <Text className="text-2xl font-bold mb-3">{t("recent_activities")}</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#3b82f6" />
            ) : reports.length === 0 ? (
              <Text className="text-gray-500 text-center">{t("no_reports_found")}</Text>
            ) : (
              reports.map((report) => (
                <View
                  key={report._id}
                  className="bg-white rounded-2xl p-4 mb-4 shadow"
                >
                  <View className="flex-row justify-between items-center mb-1">
                    <View className="flex-row items-center">
                      <Ionicons name="alert-circle" size={22} color="#dc2626" />
                      <Text className="ml-2 font-bold text-lg">{t(`${report.hazardType}`)}</Text>
                    </View>
                    <Text className="bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                      {t("critical")}
                    </Text>
                  </View>

                  <Text className="text-gray-700 mb-3">{t(report.description)}</Text>

                  {report.photo && (
                    <Image
                      source={{ uri: report.photo }}
                      className="w-full h-36 rounded-xl"
                    />
                  )}
                </View>
              ))
            )}
          </View>
        </SafeAreaView>
      </ScrollView>

      <Link href="/Report" asChild>
        <TouchableOpacity className="absolute bottom-6 right-6 bg-orange-400 rounded-full p-4 shadow-lg">
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Index;
