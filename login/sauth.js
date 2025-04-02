// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration object
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
const db = getFirestore(app);
// Function to handle user sign-up
const signUp = async (username, email, password) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email
    });

    // Send verification email
    await sendEmailVerification(user);
    console.log('Verification email sent! Check your inbox.');

    // Inform the user
    alert('A verification email has been sent to your email address. Please check your inbox.');

    // Optionally, you can redirect the user or clear the form
    window.location.href = "/login/login.html";

  } catch (error) {
    console.error('Error signing up:', error.message);
    showError(error.message);
  }
};

// Show error message
const showError = (message) => {
  const errorDiv = document.getElementById('showError');
  errorDiv.style.display="block";
  errorDiv.innerHTML = `<p style="color: red;">${message}</p>`;
};

// Handle form submission
document.getElementById('signupsubmit').addEventListener('click', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate form inputs
  if (!username || !email || !password || !confirmPassword) {
    showError('Please fill in all fields.');
    return;
  }

  if (password !== confirmPassword) {
    showError('Passwords do not match.');
    return;
  }

  // Call the signUp function
  signUp(username, email, password);
});