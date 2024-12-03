angular.module('lifestyleApp', []).controller('CategoryController', function ($scope, $location) {
  const categories = {
    fitness: {
      name: "Fitness & Sports",
      description: "Explore the latest tips and articles about fitness and sports to keep you active and healthy.",
      articles: [
        { id: 1, title: "The Importance of Sports to Health and Fitness", image: "https://thehealthcareinsights.com/wp-content/uploads/2022/10/The-Importance-of-Sports-to-Health-and-Fitness.jpg", description: "Playing sports is a great way to improve one’s health and fitness. Sports have a huge impact on a person’s daily life and health." },
        { id: 2, title: "Pentingnya Olahraga untuk Kesehatan Optimal", image: "https://sarolangunkab.go.id/storage/berita/eeac7dc21ceff5295df7b2b0ae9dff50.jpg", description: "Olahraga merupakan bagian integral dari gaya hidup sehat yang memberikan manfaat tak terbantahkan bagi kesehatan fisik dan mental." },
        { id: 3, title: "Olahraga Ala Gen Z, 6 Tips Jogging Malam agar Tetap Bugar!", image: "https://cdn0-production-images-kly.akamaized.net/w7jMxmmhBd4fYYujOhDuHp8mpXw=/1280x720/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/5033268/original/087372100_1733205826-Depositphotos_177487308_S.jpg#", description: "Kesibukan sepanjang hari sering membuat banyak orang kesulitan meluangkan waktu untuk berolahraga. Padahal, aktivitas fisik secara teratur sangat penting untuk menjaga tubuh tetap sehat." }
      ]
    },
    "healthy-foods": {
      name: "Healthy Foods",
      description: "Learn about the best healthy recipes and tips for a balanced diet.",
      articles: [
        { id: 4, title: "The Top 5 Healthiest Foods for Kids", image: "https://www.eatingwell.com/thmb/YxkWBfh2AvNYrDKoHukRdmRvD5U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg", description: "You know it's better to feed your kids vegetables instead of ice cream. But how do you get them to actually eat them?" },
        { id: 5, title: "Healthy Food or Fast Food Which One Will You Choose for Your Daily Food? ", image: "https://assets.kompasiana.com/items/category/25-1628766518.jpg?t=o&v=770", description: "In modern times like today, we are given a lot of choices when it comes to doing everything including food. As we know today in Indonesia there are many fast food outlets. "},
        { id: 6, title: "3 Makanan Sehat Ini Bisa Jadi Camilan Favoritmu Saat Bersantai di Rumah", image: "https://cdn0-production-images-kly.akamaized.net/CGxw9otAzhT_oWkxEInFUXVicUQ=/640x360/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3141793/original/033147400_1591086738-woman-in-yellow-sweater-holding-white-ceramic-plate-3886026.jpg", description: "Camilan menjadi menu yang wajib ada di ruang tamu saat kita menikmati momen santai di rumah." }
      ]
    },
    "mental-health": {
      name: "Stable Mental",
      description: "Find tips and guides to maintain mental clarity and emotional stability.",
      articles: [
        { id: 7, title: "5 tips to boost your mental health", image: "https://www.bcmhsus.ca/sites/g/files/qpdaav151/files/styles/landscape_840x450_2x/public/media/10_tips_website.png.jpg?itok=LGXOENE-", description: "Mental health is health. To help with day-to-day stress and challenges, we’re offering 10 tips to boost yours." },
        { id: 8, title: "Our best mental health tips - backed by research", image: "https://www.mentalhealth.org.uk/sites/default/files/styles/750_x_450_mhf_theme/public/2024-08/Best%20MH%20tips%20website%20teaser.png?h=10d202d3&itok=_ypSspNn", description: "This guide provides you with our best tips on how to look after your mental health - backed by research." },
        { id: 9, title: "The Importance of Mental Health: Tips and Tricks", image: "https://www.verywellmind.com/thmb/KcAt1iT48tlfgmQhsxfrcoU0e08=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1297758187-f4fda9215edc4b7ba0040dbb77d970e9.jpg", description: "Your mental health is an important part of your well-being. This aspect of your welfare determines how you’re able to operate psychologically, emotionally, and socially among others." }
      ]
    },
    "fashion-trends": {
      name: "Fashion Trends",
      description: "Stay updated with the latest trends in fashion and style.",
      articles: [
        { id: 10, title: "Pilihan Aksesori untuk Menambah Gaya Modis, Mana Favoritmu?", image: "https://cdn0-production-images-kly.akamaized.net/uuV8dzLHqFEMi201p8uoF7GGIWs=/1x70:1000x633/640x360/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4990101/original/083390700_1730710641-Depositphotos_131619278_S.jpg", description: "Aksesori adalah elemen penting dalam dunia fashion yang dapat mengubah tampilan seseorang secara signifikan." },
        { id: 11, title: "Tren Fashion Jepang Terbaru yang Wajib Anda Coba!", image: "https://www.abyadscreenprinting.com/wp-content/uploads/2024/01/fashion-japan-style.jpeg", description: "Asia memiliki beberapa pusat fashion yang kini dijadikan kiblat dunia, salah satu yang terbesar adalah Jepang." },
        { id: 12, title: "Sejarah Prancis untuk Menjadi Titik Utama Fashion Dunia", image: "http://student-activity.binus.ac.id/himhi/wp-content/uploads/sites/42/2020/12/d684c718-4d9b-429f-b098-13429352f89d.jpg", description: "Prancis dikenal dengan banyak hal, seperti makanannya yang enak, pemandangannya yang indah, dan tentunya trend fashion mereka." }
      ]
    }
  };


  const params = new URLSearchParams(window.location.search);
  const categoryKey = params.get('category') || 'fitness';

  $scope.currentCategory = categories[categoryKey] || categories.fitness;
  $scope.filteredArticles = $scope.currentCategory.articles;
});
