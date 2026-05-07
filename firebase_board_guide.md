# Firebase Board Integration Guidebook

This guide provides a step-by-step process to build a real-time board for your portfolio website using Firebase.

## 1. Firebase Project Setup
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add Project"** and give it a name (e.g., `portfolio-board`).
3.  Follow the prompts (Google Analytics is optional).

## 2. Setting Up Firestore (Database)
1.  In the Firebase sidebar, click **"Build"** -> **"Cloud Firestore"**.
2.  Click **"Create database"**.
3.  Choose **"Start in test mode"** for development (Note: You must update rules later).
4.  Select a location near you and click **"Enable"**.

## 3. Registering Your Web App
1.  On the Project Overview page, click the **Web icon (</>)**.
2.  Register your app (e.g., `My Portfolio`).
3.  **Firebase Config**: You will see a `firebaseConfig` object. Keep this safe; you will need it in your `script.js`.

## 4. Integration Code (Example)

Add the following to your project:

```javascript
// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a post
export async function addPost(title, content, image) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title,
      content,
      image,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to get posts
export async function getPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

## 5. Security Rules (Crucial)
Once you go live, update your Firestore rules to allow only authorized users to write:
```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{post} {
      allow read: if true;
      allow write: if request.auth != null; // Only logged-in users can post
    }
  }
}
```

## 6. Pro-Tip: Firebase Storage
If you want users to upload images, enable **Storage** in the Firebase console and use the `uploadBytes` and `getDownloadURL` functions from the Storage SDK.
