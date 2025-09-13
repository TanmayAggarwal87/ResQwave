import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react'
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CameraPreview = ({
    photo,
    handleRetakePhoto
}: {
    photo: CameraCapturedPicture;
    handleRetakePhoto: () => void;
}) => { 
    const router = useRouter()

   const handleSavePhoto = useCallback(() => {
    const base64Url = `data:image/jpg;base64,${photo.base64}`;
    console.log("✅ Base64 Image URL (first 60 chars):", base64Url.slice(0, 60) + "...");
    console.log("Full base64 length:", photo.base64?.length);

    if(base64Url){
        router.replace("/Report");
    }
}, [photo.base64]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Image
                    style={styles.previewContainer}
                    source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
                />
            </View>

            <View style={styles.buttonContainer}>
                {/* Delete Button */}
                <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                    <Fontisto name='trash' size={36} color='black' />
                </TouchableOpacity>

                {/* Save/Confirm Button */}
                <TouchableOpacity style={[styles.button, { marginLeft: 20 }]} onPress={handleSavePhoto}>
                    <Fontisto name='check' size={36} color='black' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 15,
        padding: 1,
        width: '95%',
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: "center",
    },
    previewContainer: {
        width: '95%',
        height: '85%',
        borderRadius: 15
    },
    buttonContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: "center",
        width: '100%',
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CameraPreview;
