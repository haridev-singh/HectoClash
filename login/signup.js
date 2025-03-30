  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
  submit.addEventListener("click", function (event){
    event.preventDefault()

    
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth=getAuth();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Creating user")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
  })
