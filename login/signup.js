document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const signupForm = document.querySelector('form');
  const fullNameInput = document.getElementById('fullName');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  const loginLink = document.querySelector('.login-option a');

  // Toggle Password Visibility
  togglePasswordButtons.forEach(button => {
      button.addEventListener('click', () => {
          const input = button.parentElement.querySelector('input');
          const type = input.type === 'password' ? 'text' : 'password';
          input.type = type;
          button.textContent = type === 'password' ? '👁' : '👁🗨';
      });
  });

  // Form Validation
  function validateForm() {
      const errors = [];
      
      // Check required fields
      const fields = [fullNameInput, usernameInput, emailInput, passwordInput, confirmPasswordInput];
      fields.forEach(field => {
          if (!field.value.trim()) {
              errors.push(`Please fill in the ${field.previousElementSibling.textContent} field`);
              field.style.borderColor = '#ff0000';
          } else {
              field.style.borderColor = '#ddd';
          }
      });

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
          errors.push('Please enter a valid email address');
          emailInput.style.borderColor = '#ff0000';
      }

      // Password match validation
      if (passwordInput.value !== confirmPasswordInput.value) {
          errors.push('Passwords do not match');
          passwordInput.style.borderColor = '#ff0000';
          confirmPasswordInput.style.borderColor = '#ff0000';
      }

      // Password length validation
      if (passwordInput.value.length < 8) {
          errors.push('Password must be at least 8 characters');
          passwordInput.style.borderColor = '#ff0000';
      }

      return errors;
  }

  // Form Submission
  signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const errors = validateForm();
      if (errors.length > 0) {
          alert(errors.join('\n'));
          return;
      }

      // Simulated API call
      try {
          // Replace with actual API endpoint
          const response = await fetch('/api/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  fullName: fullNameInput.value.trim(),
                  username: usernameInput.value.trim(),
                  email: emailInput.value.trim(),
                  password: passwordInput.value
              })
          });

          if (!response.ok) {
              throw new Error('Registration failed');
          }

          alert('Registration successful! Redirecting to login...');
          window.location.href = '/login/login.html'; // Update with actual login path

      } catch (error) {
          alert(error.message || 'An error occurred during registration');
      }
  });

  // Login Link Handler
  loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/login/login.html'; // Update with actual login path
  });

  // Input Validation Feedback
  [fullNameInput, usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
      input.addEventListener('input', () => {
          input.style.borderColor = input.value ? '#42145f' : '#ddd';
      });
  });
});