document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const userMenu = document.getElementById("user-menu");
  const logoutBtn = document.getElementById("logout-btn");
  const userIcon = userMenu.querySelector("img");

  
  const token = localStorage.getItem("token");
  if (token) {
    loginBtn.classList.add("d-none");
    userMenu.classList.remove("d-none");

    
    fetch('http://localhost:3000/api/profile', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(response => response.json())
    .then(data => {
      userIcon.src = data.profile.profile_picture || 'img/default-avatar.png'; 
    })
    .catch(error => console.error('Error fetching profile:', error));
  } else {
    loginBtn.classList.remove("d-none");
    userMenu.classList.add("d-none");
  }

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html"; 
  });
});