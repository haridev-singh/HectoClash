// Importing Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Initialize Firebase with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeQmcSvoDqT6qo-WsxFjpUUuhPs-rfrRA",
    authDomain: "hectoclash.firebaseapp.com",
    projectId: "hectoclash",
    storageBucket: "hectoclash.firebasestoragef.app",
    messagingSenderId: "362838792082",
    appId: "1:362838792082:web:ef633703338293672b934b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle the display of login/signup/profile buttons
export function setupAuthUI() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userPhotoURL = user.photoURL || 'default-avatar.png'; // Default image if no photo exists
      document.getElementById('loginButton').style.display = 'none';
      document.getElementById('signUpButton').style.display = 'none';
      document.getElementById('profilePhoto').style.display = 'flex';
      document.getElementById('userPhoto').src = userPhotoURL;
    } else {
      document.getElementById('loginButton').style.display = 'block';
      document.getElementById('signUpButton').style.display = 'block';
      document.getElementById('profilePhoto').style.display = 'none';
    }
  });
}

// Function to toggle profile options menu visibility
export function toggleProfileOptions() {
  const profileOptions = document.getElementById('profileOptions');
  profileOptions.style.display = profileOptions.style.display === 'none' || profileOptions.style.display === '' ? 'block' : 'none';
}

// Function to handle logout
export function logout() {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
      window.location.reload(); // Reload the page to reflect the changes
    })
    .catch((error) => {
      console.error("Error during logout:", error.message);
    });
}
