import { Redirect, Slot } from 'expo-router';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function _Layout() {

  return (
    <KeyboardAvoidingView behavior={Platform.OS=='ios'?"padding":"height"}>
      <ScrollView className='bg-white h-full ' keyboardShouldPersistTaps="handled">
        <SafeAreaView style={{ flex: 1 }}>
          <View className='w-full relative ' style={{height:Dimensions.get("screen").height/2.25}}>
          


          </View>
      
         <Slot />
        </SafeAreaView>
        

      </ScrollView>

    </KeyboardAvoidingView>
    
  );
}