// frontend/controllers/ProfileController.js
angular.module('profileApp', [])
  .controller('ProfileController', function ($scope, $http) {
    $scope.profile = {};
    $scope.errorMessage = '';
    $scope.successMessage = '';

   
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'index.html';
    }

  
    $http.get('http://localhost:3000/api/profile', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function (response) {
        $scope.profile = response.data.profile;
      })
      .catch(function (error) {
        $scope.errorMessage = 'Failed to load profile data.';
      });

// Update profile 
$scope.updateProfile = function () {
    const token = localStorage.getItem('token');
    if (!$scope.profile.first_name || !$scope.profile.last_name) {
      $scope.errorMessage = 'First name and last name are required!';
      return;
    }
  
 
    $http.put('http://localhost:3000/api/profile', {
      firstName: $scope.profile.first_name, 
      lastName: $scope.profile.last_name,  
      bio: $scope.profile.bio 
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(function (response) {
      $scope.successMessage = 'Profile updated successfully!';
      $scope.errorMessage = ''; 
    })
    .catch(function (error) {
      $scope.errorMessage = 'Failed to update profile.';
      $scope.successMessage = ''; 
    });
  };

    // Delete bio 
    $scope.deleteBio = function () {
      const token = localStorage.getItem('token');
      if (confirm('Are you sure you want to delete your bio?')) {
        $http.delete('http://localhost:3000/api/profile/bio', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(function (response) {
          $scope.successMessage = 'Bio deleted successfully!';
          $scope.errorMessage = '';
          $scope.profile.bio = null; 
        })
        .catch(function (error) {
          $scope.errorMessage = 'Failed to delete bio.';
          $scope.successMessage = '';
        });
      }
    };

    // Delete account 
    $scope.deleteAccount = function () {
      const token = localStorage.getItem('token');
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        $http.delete('http://localhost:3000/api/profile', {
          headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
          $scope.successMessage = 'Account deleted successfully!';
          $scope.errorMessage = '';
          localStorage.removeItem('token'); 
          window.location.href = 'index.html'; 
        })
        .catch(function (error) {
          $scope.errorMessage = 'Failed to delete account.';
          $scope.successMessage = '';
        });
      }
    };
  });