angular.module('authApp', [])
  .controller('AuthController', function ($scope, $http) {
    $scope.isLogin = true; 
    $scope.isLoggedIn = false; 
    $scope.formData = {};

    // Mengecek apakah user sudah login atau belum
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

    // Form untuk login dan register
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

    // Logout 
    $scope.logout = function () {
      localStorage.removeItem('token');
      $scope.isLoggedIn = false;
      window.location.href = 'index.html';
    };

    $scope.checkLoginStatus();
  });