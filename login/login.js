document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const loginForm = document.querySelector(".login-form form");
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const rememberCheckbox = document.querySelector('input[type="checkbox"]');
  const forgotPasswordLink = document.querySelector(".forgot");
  const signupLink = document.querySelector(".signup a");

  const togglePasswordButton = document.querySelector(".toggle-password");

  togglePasswordButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordButton.textContent = "🙈"; // Change icon
    } else {
      passwordInput.type = "password";
      togglePasswordButton.textContent = "👁️"; // Change icon back
    }
  });

  // Check if there's saved username in localStorage
  const savedUsername = localStorage.getItem("rememberedUsername");
  if (savedUsername) {
    usernameInput.value = savedUsername;
    rememberCheckbox.checked = true;
  }

  // Form Submission Handler
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get input values
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Simple validation
    if (!username || !password) {
      alert("Please fill in both username and password fields");
      return;
    }

    // Handle "Remember Me" functionality
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberedUsername", username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }

    // Here you would typically send data to server
    console.log("Login attempt with:", { username, password });

    // For demonstration purposes:
    alert("Login successful! Redirecting...");
    window.location.href = "/homepage/homepage.html"; // Replace with actual redirect URL
  });

  // Forgot Password Handler
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    const email = prompt("Please enter your email address:");
    if (email) {
      // Here you would typically send reset email
      console.log("Password reset requested for:", email);
      alert("Password reset instructions sent to your email");
    }
  });

  // Signup Link Handler
  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    // Redirect to signup page
    window.location.href = "/login/signup.html"; // Replace with actual signup URL
  });

  // Input Field Validation Styles
  [usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim()) {
        input.style.borderColor = "#42145f";
      } else {
        input.style.borderColor = "#ddd";
      }
    });
  });
});
