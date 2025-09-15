import CameraPreview from '@/components/CameraPreview';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Link } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useReportStore } from "@/store/useReportStore";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter()
  const set1Photo = useReportStore((state) => state.setPhoto);

  if (!permission) return <View />;



  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  
  const handleTakePhoto = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      const capturedPhoto = await cameraRef.current.takePictureAsync({
        base64: true, // include base64
        quality: 0.7, // reduce size a bit
      });

      setPhoto(capturedPhoto);
    } catch (error) {
      console.log("Error taking picture:", error);
    }
  }, []);

  


  const handleRetakePhoto = () => setPhoto(null);

  if (photo) return <CameraPreview photo={photo} handleRetakePhoto={handleRetakePhoto} />

  return (
    <View style={styles.container}>
      {/* Camera fills the entire screen */}
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

      <View style={styles.buttonContainer}>
        <Link href="/Report" asChild><TouchableOpacity style={styles.button} ><Ionicons name="arrow-back" size={26} color={"#fff"}/></TouchableOpacity></Link>
      </View>
      <View style={styles.topRightButton}>
        
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
        </TouchableOpacity>

        
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Ionicons name='camera' size={44} color='#fff' />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
   topRightButton: {
    position: 'absolute',
    top: 10, // adjust if you want more/less space from top
    right: 20,
  },
  buttonContainer: {
    position: 'absolute',
    top:10,
    left:20,

  },
  bottomContainer: {
    position: 'absolute',
    bottom:10,
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    borderRadius: 50,
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
