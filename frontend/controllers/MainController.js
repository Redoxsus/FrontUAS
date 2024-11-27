function MainController($scope, SubscriptionService) {
    $scope .email = '';
    $scope.password = '';
    $scope.message = '';
    $scope.error = '';
    $scope.isLoggedIn = false;
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.loginData = { email: '', password: '' };
    $scope.registerData = { name: '', email: '', password: '' };

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
                    $scope.error = error.data.error; // Tampilkan pesan kesalahan dari server
                } else {
                    $scope.error = 'Something went wrong. Please try again.';
                }
                $scope.message = '';
            });
    };

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
                    $scope.error = error.data.error; // Tampilkan pesan kesalahan dari server
                } else {
                    $scope.error = 'Registration failed. Please try again.';
                }
                $scope.message = '';
            });
    };

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
            })
            .catch(function (error) {
                console.log(error);
                if (error.data && error.data.error) {
                    $scope.error = error.data.error; // Tampilkan pesan kesalahan dari server
                } else {
                    $scope.error = 'Invalid credentials or something went wrong.';
                }
                $scope.message = '';
            });
    };
}