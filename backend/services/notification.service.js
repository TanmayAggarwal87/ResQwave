import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';

// Initialize Firebase Admin (you'll need to set up Firebase Cloud Messaging)
const initializeFirebase = () => {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
};

// Send push notification to users
export const sendPushNotification = async (notice) => {
  const firebaseInitialized = initializeFirebase();
  
  if (!firebaseInitialized) {
    throw new Error('Firebase not initialized');
  }
  
  const message = {
    notification: {
      title: notice.title,
      body: notice.content.length > 100 
        ? notice.content.substring(0, 100) + '...' 
        : notice.content
    },
    data: {
      noticeId: notice._id.toString(),
      type: 'emergency_notice',
      priority: notice.priority,
      targetAudience: notice.targetAudience
    },
    // You can add topic-based or token-based messaging here
    topic: `notices_${notice.targetAudience}`
  };
  
  try {
    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

// Alternative: Send to specific user tokens
export const sendToTokens = async (tokens, notice) => {
  const firebaseInitialized = initializeFirebase();
  
  if (!firebaseInitialized || !tokens.length) {
    return;
  }
  
  const message = {
    notification: {
      title: notice.title,
      body: notice.content
    },
    data: {
      noticeId: notice._id.toString(),
      type: 'emergency_notice'
    },
    tokens: tokens
  };
  
  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log('Multicast notification sent:', response);
    return response;
  } catch (error) {
    console.error('Error sending multicast notification:', error);
  }
};