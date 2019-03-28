export default {
  apiKey: process.env.VUE_APP_FIREBASE_PROJECT_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_PROJECT_ID + 'scoreboard-a64c2.firebaseapp.com',
  databaseURL: 'https://' + process.env.VUE_APP_FIREBASE_PROJECT_ID + '.firebaseio.com',
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID + '.appspot.com',
}
