const app = angular.module('lifestyleApp', []);

app.service('SubscriptionService', function ($http) {
    const baseUrl = 'http://localhost:3000/api';

    this.subscribe = function (email) {
        return $http.post(`${baseUrl}/subscribe`, { email });
    };
});

app.controller('MainController', function ($scope, SubscriptionService) {
    $scope.email = '';
    $scope.message = '';
    $scope.error = '';

    $scope.subscribe = function () {
        if (!$scope.email) {   // Cek jika email kosong
            $scope.error = 'Email is required!';  // Pesan jika email tidak diisi
            return;
        }

        // Panggil service untuk subscribe
        SubscriptionService.subscribe($scope.email)
            .then(function (response) {
                $scope.message = 'Subscription successful!';  
                $scope.error = '';                           
                $scope.email = '';          
            })
            .catch(function (error) {
                console.log(error);  // Log error untuk melihat struktur response yang diterima

                $scope.showSuccessMessage = false;
                $scope.showErrorMessage = true;

                // Jika error ada dan memiliki property 'data.error'
                if (error.data && error.data.error) {
                    if (error.data.error === 'This email is already subscribed.') {
                        $scope.errorMessage = 'This email is already subscribed!';
                    } else {
                        $scope.errorMessage = error.data.error;  // Tampilkan error lain yang diterima dari server
                    }
                } else {
                    $scope.errorMessage = 'Something went wrong. Please try again.'; // Pesan default
                }
                $scope.message = '';  
            });
    };
});
