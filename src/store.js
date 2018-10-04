import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase'
import 'firebase/firestore'

//Reducers
//@todo

// initialize firebase instance with config from console
const firebaseConfig = {
    apiKey: "AIzaSyDQU4AHbvZY0F6kAR3wcg__wg5LLlNpC8I",
    authDomain: "react-login-app-6c115.firebaseapp.com",
    databaseURL: "https://react-login-app-6c115.firebaseio.com",
    projectId: "react-login-app-6c115",
    storageBucket: "react-login-app-6c115.appspot.com",
    messagingSenderId: "910430581566"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true //Firestore for Profile instead of Realtime DB 
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
//Initialize Firestore
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore)

// Add firebase and to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer 
})
  
// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState,
compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
)
);

export default store;