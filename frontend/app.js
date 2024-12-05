angular.module('lifestyleApp', [])
    .controller('MainController', MainController)
    .service('SubscriptionService', SubscriptionService);

function SubscriptionService($http) {
    this.subscribe = function (email) {
        return $http.post('http://localhost:3000/api/subscribe', { email: email });
    };

    this.register = function (data) {
        return $http.post('http://localhost:3000/api/register', data);
    };

    this.login = function (data) {
        return $http.post('http://localhost:3000/api/login', data);
    };
}