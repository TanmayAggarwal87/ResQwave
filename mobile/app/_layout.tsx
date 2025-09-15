import "../i18n";

import { Stack, Tabs } from "expo-router";
import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar, TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"light-content"}/>
      <Tabs
        screenOptions={{
          headerShown: false,
          headerStatusBarHeight:0,
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "gray",
          
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            href: "/",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Report"
          options={{
            title: "Report",
            href: "/Report",
          
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="alert-circle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="SafetyTips"
          options={{
            title: "Safety Tips",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="shield" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="(auth)" options={{ href: null }} />
        <Tabs.Screen name="Camera" options={{ href: null }} />
      </Tabs>
    </SafeAreaProvider>
  );
}
