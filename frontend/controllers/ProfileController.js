// frontend/controllers/ProfileController.js
angular.module('profileApp', [])
  .controller('ProfileController', function ($scope, $http) {
    $scope.profile = {};
    $scope.errorMessage = '';
    $scope.successMessage = '';

    // Check login status before displaying profile
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'index.html';
    }

    // Fetch user profile data
    $http.get('http://localhost:3000/api/profile', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function (response) {
        $scope.profile = response.data.profile;
      })
      .catch(function (error) {
        $scope.errorMessage = 'Failed to load profile data.';
      });

// Update profile function
$scope.updateProfile = function () {
    const token = localStorage.getItem('token');
    if (!$scope.profile.first_name || !$scope.profile.last_name) {
      $scope.errorMessage = 'First name and last name are required!';
      return;
    }
  
    // Send PUT request to update profile
    $http.put('http://localhost:3000/api/profile', {
      firstName: $scope.profile.first_name, // Change to firstName
      lastName: $scope.profile.last_name,   // Change to lastName
      bio: $scope.profile.bio // Send bio
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(function (response) {
      $scope.successMessage = 'Profile updated successfully!';
      $scope.errorMessage = ''; // Clear previous error message
    })
    .catch(function (error) {
      $scope.errorMessage = 'Failed to update profile.';
      $scope.successMessage = ''; // Clear previous success message
    });
  };

    // Delete bio function
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
          $scope.profile.bio = null; // Reset bio in the profile object
        })
        .catch(function (error) {
          $scope.errorMessage = 'Failed to delete bio.';
          $scope.successMessage = '';
        });
      }
    };

    // Delete account function
    $scope.deleteAccount = function () {
      const token = localStorage.getItem('token');
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        $http.delete('http://localhost:3000/api/profile', {
          headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
          $scope.successMessage = 'Account deleted successfully!';
          $scope.errorMessage = '';
          localStorage.removeItem('token'); // Remove token after deletion
          window.location.href = 'index.html'; // Redirect to home
        })
        .catch(function (error) {
          $scope.errorMessage = 'Failed to delete account.';
          $scope.successMessage = '';
        });
      }
    };
  });