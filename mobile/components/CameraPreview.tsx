    import { Ionicons } from '@expo/vector-icons';
    import { CameraCapturedPicture } from 'expo-camera';
    import { useRouter } from 'expo-router';
    import React, { useCallback } from 'react';
    import { TouchableOpacity, Image, StyleSheet, View, Alert } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { useReportStore } from "@/store/useReportStore";
    import axios from 'axios';

    const CLOUDINARY_UPLOAD_PRESET = "hazard_reports";
    const CLOUDINARY_CLOUD_NAME = "ds2v1ow6x";

    const CameraPreview = ({
    photo,
    handleRetakePhoto
    }: {
    photo: CameraCapturedPicture;
    handleRetakePhoto: () => void;
    }) => { 
    const router = useRouter();

    const handleSavePhoto = useCallback(() => {
  if (!photo?.uri) return;

  // ✅ Save local file URI to Zustand
  useReportStore.getState().setPhoto(photo.uri);

  router.replace("/Report");
}, [photo]);


    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image
            style={styles.previewContainer}
            source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
            <Ionicons name='trash' size={36} color='black' />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { marginLeft: 20 }]} onPress={handleSavePhoto}>
            <Ionicons name="checkmark" size={36} color='black' />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' },
    box: { borderRadius: 15, padding: 1, width: '95%', backgroundColor: 'darkgray', justifyContent: 'center', alignItems: "center" },
    previewContainer: { width: '95%', height: '85%', borderRadius: 15 },
    buttonContainer: { marginTop: '4%', flexDirection: 'row', justifyContent: "center", width: '100%' },
    button: { backgroundColor: 'gray', borderRadius: 25, padding: 10, alignItems: 'center', justifyContent: 'center' }
    });

    export default CameraPreview;
