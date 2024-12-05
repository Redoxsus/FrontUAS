var app = angular.module('qnaApp', []);

app.controller('qnaController', function($scope, $http) {
    $scope.questions = [];
    $scope.newQuestion = { text: '' };

    // Mengambil data pertanyaan dari backend
    $http.get('http://localhost:3000/api/questions')
        .then(function(response) {
            $scope.questions = response.data;
        })
        .catch(function(error) {
            console.error('Error fetching questions:', error);
        });

    // Menambahkan pertanyaan baru ke backend
    $scope.addQuestion = function() {
        if ($scope.newQuestion.text.trim() !== '') {
            $http.post('http://localhost:3000/api/questions', { text: $scope.newQuestion.text })
                .then(function(response) {
                    $scope.questions.push(response.data);  // Menambahkan pertanyaan baru ke list
                    $scope.newQuestion.text = '';  // Reset form
                })
                .catch(function(error) {
                    console.error('Error adding question:', error);
                });
        }
    };

    // Edit pertanyaan
    $scope.editQuestion = function(question) {
        question.isEditing = true;
    };

// Update pada fungsi saveQuestion dan deleteQuestion
$scope.saveQuestion = function(question) {
    $http.put('http://localhost:3000/api/questions/' + question.id, { text: question.text })  // Gunakan 'id' dan bukan '_id'
        .then(function(response) {
            question.isEditing = false;
        })
        .catch(function(error) {
            console.error('Error saving question:', error);
        });
};

$scope.deleteQuestion = function(question) {
    $http.delete('http://localhost:3000/api/questions/' + question.id)  // Gunakan 'id' dan bukan '_id'
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
