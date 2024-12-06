// frontend/controllers/ProfileController.js
function MainController($scope, SubscriptionService) {
    $scope.email = '';
    $scope.password = '';
    $scope.message = '';
    $scope.error = '';
    $scope.isLoggedIn = false;
    $scope.user = {
        email: '',
        password: '',
        name: ''
    };
    $scope.loginData = { email: '', password: '' };
    $scope.registerData = { name: '', email: '', password: '' };
    $scope.profileData = { name: '', email: '' }; // Untuk update profil

    // Subscribe ke newsletter
    $scope.subscribe = function () {
        if (!$scope.email) {
            $scope.error = 'Email is required!';
            return;
        }

        SubscriptionService.subscribe($scope.email)
            .then(function (response) {
                $scope.message = 'Subscription successful!';
                $scope.error = '';
                $scope.email = '';
            })
            .catch(function (error) {
                console.log(error);
                if (error.data && error.data.error) {
                    $scope.error = error.data.error;
                } else {
                    $scope.error = 'Something went wrong. Please try again.';
                }
                $scope.message = '';
            });
    };

    // Registrasi pengguna baru
    $scope.register = function () {
        if (!$scope.registerData.name || !$scope.registerData.email || !$scope.registerData.password) {
            $scope.error = 'All fields are required!';
            return;
        }

        SubscriptionService.register($scope.registerData)
            .then(function (response) {
                $scope.message = 'Registration successful! Please login.';
                $scope.error = '';
                $scope.registerData = { name: '', email: '', password: '' };
            })
            .catch(function (error) {
                console.log(error);
                if (error.data && error.data.error) {
                    $scope.error = error.data.error;
                } else {
                    $scope.error = 'Registration failed. Please try again.';
                }
                $scope.message = '';
            });
    };

    // Login pengguna
    $scope.login = function () {
        if (!$scope.loginData.email || !$scope.loginData.password) {
            $scope.error = 'Email and password are required!';
            return;
        }

        SubscriptionService.login($scope.loginData)
            .then(function (response) {
                $scope.message = 'Login successful!';
                $scope.error = '';
                $scope.isLoggedIn = true;
                // Store token or session info if needed
                localStorage.setItem('token', response.data.token);
                // Redirect ke profil setelah login
                window.location.href = 'profile.html'; 
            })
            .catch(function (error) {
                console.log(error);
                if (error.data && error.data.error) {
                    $scope.error = error.data.error;
                } else {
                    $scope.error = 'Invalid credentials or something went wrong.';
                }
                $scope.message = '';
            });
    };

    // Membaca data profil pengguna 
    $scope.getProfile = function () {
        const token = localStorage.getItem('token');
        if (token) {
            SubscriptionService.getProfile(token)
                .then(function (response) {
                    $scope.profileData = response.data; // Menampilkan data profil
                    $scope.message = 'Profile loaded successfully!';
                    $scope.error = '';
                })
                .catch(function (error) {
                    console.log(error);
                    $scope.error = 'Unable to load profile.';
                    $scope.message = '';
                });
        } else {
            $scope.error = 'User not logged in.';
        }
    };

    // Update profil pengguna 
    $scope.updateProfile = function () {
        const token = localStorage.getItem('token');
        if (!$scope.profileData.name || !$scope.profileData.email) {
            $scope.error = 'Name and email are required!';
            return;
        }
        
        SubscriptionService.updateProfile($scope.profileData, token)
            .then(function (response) {
                $scope.message = 'Profile updated successfully!';
                $scope.error = '';
                $scope.getProfile(); // Refresh profil setelah update
            })
            .catch(function (error) {
                console.log(error);
                $scope.error = 'Failed to update profile.';
                $scope.message = '';
            });
    };

    // Menghapus akun pengguna 
    $scope.deleteAccount = function () {
        const token = localStorage.getItem('token');
        if (token) {
            SubscriptionService.deleteAccount(token)
                .then(function (response) {
                    $scope.message = 'Account deleted successfully!';
                    $scope.error = '';
                    localStorage.removeItem('token');
                    $scope.isLoggedIn = false;
                    window.location.href = 'index.html'; 
                })
                .catch(function (error) {
                    console.log(error);
                    $scope.error = 'Failed to delete account.';
                    $scope.message = '';
                });
        } else {
            $scope.error = 'User not logged in.';
        }
    };
}