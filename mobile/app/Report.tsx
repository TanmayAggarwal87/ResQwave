import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cn from "clsx";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "@/libs/axios";
import { useReportStore } from "@/store/useReportStore";



const Report = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hazardType: "",
    description: "",
    photo: null,
  });
  const photo = useReportStore((state) => state.photo);
  const [speak, setSpeak] = useState(false);
  const { t } = useTranslation();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
  if (!formData.hazardType || !formData.description || !photo) {
    Alert.alert("All fields required!");
    return;
  }

  try {
    const formDataObj = new FormData();
    formDataObj.append("hazardType", formData.hazardType);
    formDataObj.append("description", formData.description);
    formDataObj.append("hazardStage", "critical");

    // If your `photo` from Zustand is already a Cloudinary URL (because you upload from CameraPreview)
    // then just append as text:
    if (photo.startsWith("http")) {
      formDataObj.append("photoUrl", photo);
    } else {
      // If it's a local base64 string and you want backend to upload to Cloudinary
      formDataObj.append("photo", {
        uri: photo, // Make sure it's a file:// URI, not base64
        name: "hazard.jpg",
        type: "image/jpeg",
      });
    }

    await axiosInstance.post("/reports/add", formDataObj, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setStep(4);
    useReportStore.getState().reset();
  } catch (err) {
    console.log( err);
    Alert.alert("Failed to submit report");
  }
};



  return (
    <SafeAreaView className="flex-1 bg-white p-4 gap-4">
      <View className="bg-red-600 flex justify-between px-2 w-full rounded-xl py-4 items-center flex-row mb-5">
        <Ionicons name="call-outline" size={25} color={"#ffffff"} />
        <View className="flex justify-start items-center flex-col">
          <Text className="text-white font-bold text-lg">
            {t("life_threatening_emergency")}
          </Text>
          <Text className="text-gray-200 mt-1 font-semibold text-md">
            {t("call_emergency_services")}
          </Text>
        </View>
        <TouchableOpacity className="bg-white px-2 py-1 rounded-xl">
          <Text className="font-semibold text-md">Call 108</Text>
        </TouchableOpacity>
      </View>

      {step <= 3 && (
        <View className="flex-row justify-center mb-4">
          {[1, 2, 3].map((s) => (
            <View
              key={s}
              className={`h-2 w-8 mx-1 rounded-full ${
                s <= step ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </View>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <View>
          <Text className="text-xl font-bold mb-4">
            What type of hazard are you reporting?
          </Text>
          {[
            t("oil_spill_title"),
             t("storm_surge_title"),
             t("dead_fish_title"),
             t("stranded_animal_title"),
             t("illegal_fishing_title"),
             t("other_hazard_title"),
          ].map((type) => (
            <TouchableOpacity
              key={type}
              className={`p-4 rounded-2xl mb-3 ${
                formData.hazardType === type ? "bg-blue-200" : "bg-gray-100"
              }`}
              onPress={() => setFormData({ ...formData, hazardType: type })}
            >
              <Text className="text-lg">{type}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={handleNext}
            disabled={!formData.hazardType}
            className={`p-3 rounded-2xl mt-6 ${
              formData.hazardType ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <Text className="text-white text-center text-lg">{t("continue")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <View>
          <Text className="text-xl font-bold mb-2">{t("Provide Details")}</Text>
          <Text className="text-md font-light mb-4 text-gray-600">
            {t("help_authorities")}
          </Text>

          {/* Location Card */}
          <View className="flex justify-between items-center border-1 flex-row px-3 py-4 rounded-xl mb-8 bg-blue-200/50">
            <View className="flex-row gap-4 items-center">
              <Ionicons name="location-outline" size={28} />
              <View>
                <Text className="text-xl font-bold">{t("current_location")}</Text>
                <Text className="text-md text-gray-700 font-light">
                  {t("getting_location")}
                </Text>
              </View>
            </View>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-xl">
              <Text className="text-lg">Update</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <TextInput
            placeholder={t("describe_what_you_see")}
            multiline
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            className="border border-gray-300 p-3 rounded-2xl h-auto mb-4 text-lg"
          />

          {/* Mic Toggle */}
          <TouchableOpacity
            onPress={() => setSpeak(!speak)}
            className={cn(
              "px-4 py-1 border border-black w-auto max-w-[160px] text-center rounded-xl mb-2 ",
              speak ? "bg-red-200" : "bg-white"
            )}
          >
            <View className="flex-row justify-center items-center gap-1">
              <Ionicons
                name={speak ? "mic-off-outline" : "mic-outline"}
                size={18}
              />
              <Text>{speak ? t("stop_recording" ): t("start_recording")}</Text>
            </View>
          </TouchableOpacity>

          {/* Photo / Video Buttons */}
          <Text className="text-xl font-bold mt-2">Add Photo</Text>
          <View className="flex-row gap-4 mt-6 mx-4 mb-4 justify-center">
            <Link href="/Camera" asChild>
              <TouchableOpacity className="px-10 py-6 border border-black rounded-xl items-center">
                <Ionicons name="camera-outline" size={26} />
                <Text>{t("take_photo")}</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity className="px-10 py-6 border border-black rounded-xl items-center">
              <Ionicons name="videocam-outline" size={26} />
              <Text>Record Video</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-2xl"
            onPress={handleNext}
          >
            <Text className="text-white text-center text-lg">{t("continue")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-3 mt-3 rounded-2xl bg-gray-300"
            onPress={handleBack}
          >
            <Text className="text-center text-lg">{t("back")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <View>
          <Text className="text-3xl font-bold mb-4">{t("review_and_submit")}</Text>
          <Image
            source={{
              uri: `${photo}`,
            }}
            className="w-full h-44 rounded-xl mb-4"
          />

          <View className="flex-row mb-2">
            <Text className="text-xl font-bold">{t("hazard_type")}:</Text>
            <Text className="text-xl"> {formData.hazardType}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-xl font-bold">{t("description")}:</Text>
            <Text className="text-xl"> {formData.description}</Text>
          </View>

          <TouchableOpacity
            className="bg-green-500 p-3 rounded-2xl mt-6"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center text-lg">{t("submit")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-3 mt-3 rounded-2xl bg-gray-300"
            onPress={handleBack}
          >
            <Text className="text-center text-lg">{t("back")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 4 && (
        <View className="flex-1 justify-center items-center">
          <View className="p-6 bg-green-200 rounded-full"><Ionicons name="send" size={80} color="green" /></View>
          
          <Text className="text-2xl font-bold mt-4 text-green-700">
            {t("report_submitted")}
          </Text>
          <Text className="text-md text-gray-600 text-center mt-2 mb-6">
            Your report has been sent to authorities for verification.
            {"\n"}Report ID: #RQ2024091101
          </Text>

          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-2xl w-60 mb-3"
            onPress={() => setStep(1)}
          >
            <Text className="text-white text-center text-lg">
              {t("report_another_hazard")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-200 p-3 rounded-2xl w-60">
            <Text className="text-center text-lg">{t("track_this_report")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Report;
