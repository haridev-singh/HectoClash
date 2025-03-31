// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
      messageDiv.style.opacity=0;
  },5000);
}

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

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()


  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      console.log("HII");
      showMessage('Account Created Successfully', 'showError');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = '/login/login.html';
        })
        .catch((error) => {
          console.error("error writing document", error);

        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'showError');
      }
      else {
        showMessage('unable to create User', 'showError');
      }
    })
});