function switchTab(tab) {
  const loginCard = document.getElementById("login-card");
  const signupCard = document.getElementById("signup-card");
  const loginTab = document.getElementById("login-tab");
  const signupTab = document.getElementById("signup-tab");

  if (tab === "login") {
    loginCard.style.display = "block";
    signupCard.style.display = "none";
    loginTab.classList.add("active-tab");
    signupTab.classList.remove("active-tab");
  } else {
    loginCard.style.display = "none";
    signupCard.style.display = "block";
    signupTab.classList.add("active-tab");
    loginTab.classList.remove("active-tab");
  }
}

window.onload = () => switchTab("login");

document.addEventListener("DOMContentLoaded", () => {
  const loginToggle = document.querySelector('.toggle-password');
  loginToggle.addEventListener('click', (e) => {
    const passwordInput = document.getElementById('loginpassword');
    const toggleIcon = e.target;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.src = '/login/images/eye.png';
    } else {
      passwordInput.type = 'password';
      toggleIcon.src = '/login/images/view.png';
    }
  });

  const signupTogglePassword = document.querySelector('.toggle-password1');
  signupTogglePassword.addEventListener('click', (e) => {
    const passwordInput = document.getElementById('password');
    const toggleIcon = e.target;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.src = '/login/images/eye.png';
    } else {
      passwordInput.type = 'password';
      toggleIcon.src = '/login/images/view.png';
    }
  });

  const signupToggleConfirmPassword = document.querySelector('.toggle-password2');
  signupToggleConfirmPassword.addEventListener('click', (e) => {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleIcon = e.target;

    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
      toggleIcon.src = '/login/images/eye.png';
    } else {
      confirmPasswordInput.type = 'password';
      toggleIcon.src = '/login/images/view.png';
    }
  });
});
