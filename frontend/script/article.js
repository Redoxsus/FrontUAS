angular.module('lifestyleApp', []).controller('ArticleController', function ($scope, $location) {

  const articles = {
    1: {
      title: "Top 10 Workouts for a Fit Body",
      image: "https://example.com/article1.jpg",
      content: "This article provides detailed information about the top 10 workouts for a fit body, including tips and routines.",
      category: "fitness",
    },
    2: {
      title: "The Importance of Cardio in Your Routine",
      image: "https://example.com/article2.jpg",
      content: "Cardio plays an essential role in maintaining a healthy body. Learn how to incorporate it effectively into your daily routine.",
      category: "fitness",
    },
    3: {
      title: "Strength Training for Beginners",
      image: "https://example.com/article3.jpg",
      content: "Start your strength training journey with this beginner's guide, filled with practical tips and exercises.",
      category: "fitness",
    },
    4: {
      title: "10 Easy Recipes for a Balanced Diet",
      image: "https://example.com/article4.jpg",
      content: "Quick and nutritious recipes for a healthy lifestyle.",
      category: "healthy-foods",
    },
    5: {
      title: "Superfoods You Should Add to Your Diet",
      image: "https://example.com/article5.jpg",
      content: "Discover the benefits of adding superfoods to your meals.",
      category: "healthy-foods",
    },
    6: {
      title: "How to Meal Prep for the Week",
      image: "https://example.com/article6.jpg",
      content: "Save time and eat healthy with these meal prep tips.",
      category: "healthy-foods",
    },
    7: {
      title: "Meditation Techniques for Beginners",
      image: "https://example.com/article7.jpg",
      content: "Learn how to meditate and reduce stress in your daily life.",
      category: "mental-health",
    },
    8: {
      title: "The Role of Sleep in Mental Health",
      image: "https://example.com/article8.jpg",
      content: "Why good sleep is crucial for emotional stability.",
      category: "mental-health",
    },
    9: {
      title: "Coping with Anxiety: Tips and Tricks",
      image: "https://example.com/article9.jpg",
      content: "Practical advice to manage anxiety effectively.",
      category: "mental-health",
    },
    10: {
      title: "Top Fashion Trends for 2024",
      image: "https://example.com/article10.jpg",
      content: "Discover the best fashion trends for the upcoming year.",
      category: "fashion-trends",
    },
    11: {
      title: "Sustainable Fashion: What You Need to Know",
      image: "https://example.com/article11.jpg",
      content: "Learn about eco-friendly choices in the fashion industry.",
      category: "fashion-trends",
    },
    12: {
      title: "How to Accessorize Like a Pro",
      image: "https://example.com/article12.jpg",
      content: "Tips for choosing the perfect accessories to complement your outfit.",
      category: "fashion-trends",
    },
  };


  const params = new URLSearchParams($location.absUrl().split('?')[1]);
  const articleId = parseInt(params.get('id'), 10);


  $scope.article = articles[articleId];
});
