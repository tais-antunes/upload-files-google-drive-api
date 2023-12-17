// // // src/components/firebase.js
// // import { initializeApp } from 'firebase/app';
// // import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// // import { getFirestore } from 'firebase/firestore';

// // const firebaseConfig = {
// //   apiKey: "AIzaSyC9wnRMjbWSrapZ6d1B8s3vF-945FGtn5g",
// //   authDomain: "upload-de-arquivos-396520.firebaseapp.com",
// //   projectId: "upload-de-arquivos-396520",
// //   storageBucket: "upload-de-arquivos-396520.appspot.com",
// //   messagingSenderId: "475307970852",
// //   appId: "1:475307970852:web:ee1d6012393fc22573a3b1",
// //   measurementId: "G-D7LEY9D6LV"
// // };

// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);  // Alteração aqui para obter o objeto auth
// // const firestore = getFirestore(app);

// // const googleAuthProvider = new GoogleAuthProvider();  // Alteração aqui para usar o objeto GoogleAuthProvider

// // export { auth, googleAuthProvider, firestore };
// // firebase.js
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyC9wnRMjbWSrapZ6d1B8s3vF-945FGtn5g",
//   authDomain: "upload-de-arquivos-396520.firebaseapp.com",
//   projectId: "upload-de-arquivos-396520",
//   storageBucket: "upload-de-arquivos-396520.appspot.com",
//   messagingSenderId: "475307970852",
//   appId: "1:475307970852:web:ee1d6012393fc22573a3b1",
//   measurementId: "G-D7LEY9D6LV"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);
// const googleAuthProvider = new GoogleAuthProvider();

// const signInWithGoogle = async () => {
//   try {
//     await signInWithPopup(auth, googleAuthProvider);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export { auth, firestore, googleAuthProvider, signInWithGoogle };


// src/components/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9wnRMjbWSrapZ6d1B8s3vF-945FGtn5g",
  authDomain: "upload-de-arquivos-396520.firebaseapp.com",
  projectId: "upload-de-arquivos-396520",
  storageBucket: "upload-de-arquivos-396520.appspot.com",
  messagingSenderId: "475307970852",
  appId: "1:475307970852:web:ee1d6012393fc22573a3b1",
  measurementId: "G-D7LEY9D6LV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleAuthProvider);
  } catch (error) {
    console.error(error);
  }
};

export { auth, firestore, googleAuthProvider, signInWithGoogle, signInWithEmailAndPassword };
