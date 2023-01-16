import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

require('dotenv').config();

const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
const APP_ID_NAME = process.env.APP_ID_NAME;
const APP_ID_VALUE = process.env.APP_ID_VALUE;
const AUTH_DOMAIN_NAME = process.env.AUTH_DOMAIN_NAME;
const AUTH_DOMAIN_VALUE = process.env.AUTH_DOMAIN_VALUE;
const MESSAGING_SENDER_ID_NAME = process.env.MESSAGING_SENDER_ID_NAME;
const MESSAGING_SENDER_ID_VALUE = process.env.MESSAGING_SENDER_ID_VALUE;
const PROJECT_ID_NAME = process.env.PROJECT_ID_NAME;
const PROJECT_ID_VALUE = process.env.PROJECT_ID_VALUE;
const STORAGE_BUCKET_NAME = process.env.STORAGE_BUCKET_NAME;
const STORAGE_BUCKET_VALUE = process.env.STORAGE_BUCKET_VALUE;

const firebaseConfig = {
  apiKey: 'API_KEY_VALUE',
  authDomain: 'AUTH_DOMAIN_VALUE',
  projectId: 'PROJECT_ID_VALUE',
  storageBucket: 'STORAGE_BUCKET_VALUE',
  messagingSenderId: 'MESSAGING_SENDER_ID_VALUE',
  appId: 'APP_ID_VALUE',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
