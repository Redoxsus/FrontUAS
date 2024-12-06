app.service('SubscriptionService', function($http) {
    const apiUrl = 'http://localhost:3000/api'; 
    
    this.subscribe = function(email) {
        return $http.post(`${apiUrl}/subscribe`, { email });
    };

    this.register = function(user) {
        return $http.post(`${apiUrl}/register`, user);
    };

    this.login = function(credentials) {
        return $http.post(`${apiUrl}/login`, credentials);
    };

    this.getProfile = function(token) {
        return $http.get(`${apiUrl}/profile`, { headers: { 'Authorization': `Bearer ${token}` } });
    };

    this.updateProfile = function(profileData, token) {
        return $http.put(`${apiUrl}/profile`, profileData, { headers: { 'Authorization': `Bearer ${token}` } });
    };

    this.deleteAccount = function(token) {
        return $http.delete(`${apiUrl}/profile`, { headers: { 'Authorization': `Bearer ${token}` } });
    };
});
