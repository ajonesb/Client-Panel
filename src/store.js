import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase'
import 'firebase/firestore'

//Reducers
//@todo

// initialize firebase instance with config from console
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
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
