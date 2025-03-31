// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle user sign-up
const signUp = async (fullName, username, email, password) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      username: username,
      email: email
    });

    // Send verification email
    await sendEmailVerification(user);
    console.log('Verification email sent! Check your inbox.');

    // Inform the user
    alert('A verification email has been sent to your email address. Please check your inbox.');

    // Optionally, you can redirect the user or clear the form
    // window.location.href = "some-other-page.html";

  } catch (error) {
    console.error('Error signing up:', error.message);
    showError(error.message);
  }
};

// Show error message
const showError = (message) => {
  const errorDiv = document.getElementById('showError');
  errorDiv.innerHTML = `<p style="color: red;">${message}</p>`;
};

// Handle form submission
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate form inputs
  if (!fullName || !username || !email || !password || !confirmPassword) {
    showError('Please fill in all fields.');
    return;
  }

  if (password !== confirmPassword) {
    showError('Passwords do not match.');
    return;
  }

  // Call the signUp function
  signUp(fullName, username, email, password);
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach((button) => {
  button.addEventListener('click', (e) => {
    const passwordInput = e.target.previousElementSibling;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      e.target.textContent = '🙈'; // Change to an eye-slash emoji
    } else {
      passwordInput.type = 'password';
      e.target.textContent = '👁️'; // Change to an eye emoji
    }
  });
});
