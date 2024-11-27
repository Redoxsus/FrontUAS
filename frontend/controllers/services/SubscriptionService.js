angular.module('lifestyleApp').service('SubscriptionService', function($http) {
    const baseUrl = 'http://localhost:3000/api';
    
    this.subscribe = function(email) {
        return $http.post(`${baseUrl}/subscribe`, { email });
    };
    
    this.register = function(user) {
        return $http.post(`${baseUrl}/register`, user);
    };
    
    this.login = function(user) {
        return $http.post(`${baseUrl}/login`, user);
    };
});