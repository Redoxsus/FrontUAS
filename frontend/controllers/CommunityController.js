angular.module('communityApp', [])
  .controller('CommunityController', function($scope) {
    $scope.communitySections = [
      {
        title: "Community Groups",
        description: "Join different groups based on your interests and connect with like-minded people.",
        image: "https://via.placeholder.com/400x250",
        link: "#groups"
      },
      {
        title: "Events",
        description: "Stay up-to-date with the latest events happening in the community. Join us for meetups and more!",
        image: "https://via.placeholder.com/400x250",
        link: "#events"
      },
      {
        title: "Discussions",
        description: "Participate in forums and discussions to share your knowledge and experiences.",
        image: "https://via.placeholder.com/400x250",
        link: "#forums"
      }
    ];
  });
