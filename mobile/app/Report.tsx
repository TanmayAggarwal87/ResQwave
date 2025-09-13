import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cn from "clsx";
import { Link } from "expo-router";

const Report = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hazardType: "",
    description: "",
    photo: null,
  });
  const [speak, setSpeak] = useState(false);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4 gap-4">
      <View className="bg-red-600 flex justify-between px-2 w-full rounded-xl py-4 items-center flex-row mb-5">
        <Ionicons name="call-outline" size={25} color={"#ffffff"} />
        <View className="flex justify-center items-center flex-col">
          <Text className="text-white font-bold text-xl">
            Life Threatening Emergency?
          </Text>
          <Text className="text-gray-200 mt-1 font-semibold text-md">
            Call Emergency Services Immediately
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
            "Oil Spill",
            "Dead Fish/Red Tide",
            "Stranded Animal",
            "Storm Surge",
            "Illegal Fishing",
            "Other Hazard",
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
            <Text className="text-white text-center text-lg">Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <View>
          <Text className="text-xl font-bold mb-2">Provide Details</Text>
          <Text className="text-md font-light mb-4 text-gray-600">
            Help authorities understand the threat better
          </Text>

          {/* Location Card */}
          <View className="flex justify-between items-center border-1 flex-row px-3 py-4 rounded-xl mb-8 bg-blue-200/50">
            <View className="flex-row gap-4 items-center">
              <Ionicons name="location-outline" size={28} />
              <View>
                <Text className="text-xl font-bold">Current Location</Text>
                <Text className="text-md text-gray-700 font-light">
                  Getting Location...
                </Text>
              </View>
            </View>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-xl">
              <Text className="text-lg">Update</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <TextInput
            placeholder="Describe what you see..."
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
              <Text>{speak ? "Stop Recording" : "Start Recording"}</Text>
            </View>
          </TouchableOpacity>

          {/* Photo / Video Buttons */}
          <Text className="text-xl font-bold mt-2">Add Photo or Video</Text>
          <View className="flex-row gap-4 mt-6 mx-4 mb-4 justify-center">
            <Link href="/Camera" asChild>
              <TouchableOpacity className="px-10 py-6 border border-black rounded-xl items-center">
                <Ionicons name="camera-outline" size={26} />
                <Text>Take Photo</Text>
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
            <Text className="text-white text-center text-lg">Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-3 mt-3 rounded-2xl bg-gray-300"
            onPress={handleBack}
          >
            <Text className="text-center text-lg">Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <View>
          <Text className="text-3xl font-bold mb-4">Review & Submit</Text>
          <Image
            source={{
              uri: "https://placehold.co/600x400/png",
            }}
            className="w-full h-44 rounded-xl mb-4"
          />

          <View className="flex-row mb-2">
            <Text className="text-xl font-bold">Hazard Type:</Text>
            <Text className="text-xl"> {formData.hazardType}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-xl font-bold">Description:</Text>
            <Text className="text-xl"> {formData.description}</Text>
          </View>

          <TouchableOpacity
            className="bg-green-500 p-3 rounded-2xl mt-6"
            onPress={() => setStep(4)}
          >
            <Text className="text-white text-center text-lg">Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="p-3 mt-3 rounded-2xl bg-gray-300"
            onPress={handleBack}
          >
            <Text className="text-center text-lg">Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 4 && (
        <View className="flex-1 justify-center items-center">
          <View className="p-6 bg-green-200 rounded-full"><Ionicons name="send" size={80} color="green" /></View>
          
          <Text className="text-2xl font-bold mt-4 text-green-700">
            Report Submitted!
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
              Report Another Hazard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-200 p-3 rounded-2xl w-60">
            <Text className="text-center text-lg">Track This Report</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Report;
