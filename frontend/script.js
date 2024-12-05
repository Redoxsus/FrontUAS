    // Tambahkan event listener untuk menangani scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) { // Jika scroll lebih dari 50px
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
      
      angular.module('lifestyleApp', [])
      .controller('MainController', function ($scope) {
        $scope.isRegisterForm = false; // Default form is Login
      
        // Toggle between Login and Register form
        $scope.toggleForm = function () {
          $scope.isRegisterForm = !$scope.isRegisterForm;
        };
      
        // Login form submit
        $scope.loginSubmit = function () {
          // Handle login logic here (you can use $scope.login.email and $scope.login.password)
          console.log('Login with:', $scope.login);
        };
      
        // Register form submit
        $scope.registerSubmit = function () {
          // Handle register logic here (you can use $scope.register)
          console.log('Register with:', $scope.register);
        };
      });