angular.module('authApp', [])
  .controller('AuthController', function ($scope, $http) {
    $scope.isLogin = true; // Default mode is login
    $scope.isLoggedIn = false; // Default logged-out status
    $scope.formData = {};

    // Check if the user is logged in by checking the token
    $scope.checkLoginStatus = function () {
      const token = localStorage.getItem('token');
      if (token) {
        $scope.isLoggedIn = true;
      }
    };

    $scope.toggleAuthMode = function () {
      $scope.isLogin = !$scope.isLogin;
      $scope.formData = {}; // Reset form data
    };

    // Submit login or register form
    $scope.submitForm = function () {
      const url = $scope.isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/register';
      $http.post(url, $scope.formData)
        .then(function (response) {
          alert(response.data.message);
          if ($scope.isLogin) {
            localStorage.setItem('token', response.data.token);
            $scope.isLoggedIn = true;
            window.location.href = 'index.html';
          }
        })
        .catch(function (error) {
          alert(error.data.error);
        });
    };

    // Logout function
    $scope.logout = function () {
      localStorage.removeItem('token');
      $scope.isLoggedIn = false;
      window.location.href = 'index.html';
    };

    // Call the checkLoginStatus on controller initialization
    $scope.checkLoginStatus();
  });
