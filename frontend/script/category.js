angular.module('lifestyleApp', []).controller('CategoryController', function ($scope, $location) {
  const categories = {
    fitness: {
      name: "Fitness & Sports",
      description: "Explore the latest tips and articles about fitness and sports to keep you active and healthy.",
      articles: [
        { id: 1, title: "Top 10 Workouts for a Fit Body", image: "https://example.com/article1.jpg", description: "Discover the best exercises to help you achieve your fitness goals." },
        { id: 2, title: "The Importance of Cardio in Your Routine", image: "https://example.com/article2.jpg", description: "Learn why cardio is essential and how to incorporate it into your lifestyle." },
        { id: 3, title: "Strength Training for Beginners", image: "https://example.com/article3.jpg", description: "A step-by-step guide to start your strength training journey." }
      ]
    },
    "healthy-foods": {
      name: "Healthy Foods",
      description: "Learn about the best healthy recipes and tips for a balanced diet.",
      articles: [
        { id: 4, title: "10 Easy Recipes for a Balanced Diet", image: "https://example.com/article4.jpg", description: "Quick and nutritious recipes for a healthy lifestyle." },
        { id: 5, title: "Superfoods You Should Add to Your Diet", image: "https://example.com/article5.jpg", description: "Discover the benefits of adding superfoods to your meals." },
        { id: 6, title: "How to Meal Prep for the Week", image: "https://example.com/article6.jpg", description: "Save time and eat healthy with these meal prep tips." }
      ]
    },
    "mental-health": {
      name: "Stable Mental",
      description: "Find tips and guides to maintain mental clarity and emotional stability.",
      articles: [
        { id: 7, title: "Meditation Techniques for Beginners", image: "https://example.com/article7.jpg", description: "Learn how to meditate and reduce stress in your daily life." },
        { id: 8, title: "The Role of Sleep in Mental Health", image: "https://example.com/article8.jpg", description: "Why good sleep is crucial for emotional stability." },
        { id: 9, title: "Coping with Anxiety: Tips and Tricks", image: "https://example.com/article9.jpg", description: "Practical advice to manage anxiety effectively." }
      ]
    },
    "fashion-trends": {
      name: "Fashion Trends",
      description: "Stay updated with the latest trends in fashion and style.",
      articles: [
        { id: 10, title: "Top Fashion Trends for 2024", image: "https://example.com/article10.jpg", description: "Discover what's in style for the upcoming year." },
        { id: 11, title: "Sustainable Fashion: What You Need to Know", image: "https://example.com/article11.jpg", description: "Learn about eco-friendly choices in the fashion industry." },
        { id: 12, title: "How to Accessorize Like a Pro", image: "https://example.com/article12.jpg", description: "Tips for choosing the perfect accessories to complement your outfit." }
      ]
    }
  };


  const params = new URLSearchParams(window.location.search);
  const categoryKey = params.get('category') || 'fitness';

  $scope.currentCategory = categories[categoryKey] || categories.fitness;
  $scope.filteredArticles = $scope.currentCategory.articles;
});
