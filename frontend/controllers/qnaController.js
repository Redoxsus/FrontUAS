var app = angular.module('qnaApp', []);

app.controller('qnaController', function($scope, $http) {
    $scope.questions = [];
    $scope.newQuestion = { text: '' };

    // Mengambil data feedback
    $http.get('http://localhost:3000/api/questions')
        .then(function(response) {
            $scope.questions = response.data;
        })
        .catch(function(error) {
            console.error('Error fetching questions:', error);
        });

    // Menambahkan feedback baru ke backend
    $scope.addQuestion = function() {
        if ($scope.newQuestion.text.trim() !== '') {
            $http.post('http://localhost:3000/api/questions', { text: $scope.newQuestion.text })
                .then(function(response) {
                    $scope.questions.push(response.data);  // Menambahkan feedback abru ke list
                    $scope.newQuestion.text = '';  
                })
                .catch(function(error) {
                    console.error('Error adding question:', error);
                });
        }
    };

    // Edit feedback
    $scope.editQuestion = function(question) {
        question.isEditing = true;
    };

// Update pada fungsi save dan delete
$scope.saveQuestion = function(question) {
    $http.put('http://localhost:3000/api/questions/' + question.id, { text: question.text }) 
        .then(function(response) {
            question.isEditing = false;
        })
        .catch(function(error) {
            console.error('Error saving question:', error);
        });
};

$scope.deleteQuestion = function(question) {
    $http.delete('http://localhost:3000/api/questions/' + question.id)  
        .then(function(response) {
            const index = $scope.questions.indexOf(question);
            if (index > -1) {
                $scope.questions.splice(index, 1);
            }
        })
        .catch(function(error) {
            console.error('Error deleting question:', error);
        });
};

});