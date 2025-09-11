import { Stack, Tabs } from "expo-router";
import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={({ route }) => ({
          animation:"shift",
          headerShown: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "gray",
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              activeOpacity={0.8} // less than 1 means slight fade, no ripple
            />
          ),
        })}
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
      </Tabs>
    </SafeAreaProvider>
  );
}
