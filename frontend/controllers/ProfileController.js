// frontend/controllers/ProfileController.js
angular.module('profileApp', [])
  .controller('ProfileController', function ($scope, $http) {
    $scope.profile = {};
    $scope.errorMessage = '';
    $scope.successMessage = '';

    // Cek login status sebelum menampilkan profil
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
    }

    // Ambil data profil pengguna
    $http.get('http://localhost:3000/api/profile', { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function (response) {
        $scope.profile = response.data.profile;
      })
      .catch(function (error) {
        $scope.errorMessage = 'Gagal memuat data profil.';
      });

    // Fungsi untuk memperbarui profil
    $scope.updateProfile = function () {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      // Menambahkan data profil
      formData.append('firstName', $scope.profile.firstName);
      formData.append('lastName', $scope.profile.lastName);
      formData.append('bio', $scope.profile.bio);
      
      // Jika ada foto profil yang dipilih, tambahkan ke FormData
      if ($scope.profile.picture) {
        formData.append('profilePicture', $scope.profile.picture);
      }

      // Kirim request PUT untuk memperbarui profil
      $http.put('http://localhost:3000/api/profile', formData, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': undefined // Mengindikasikan bahwa request ini menggunakan multipart/form-data
        },
        transformRequest: angular.identity // Memastikan FormData dikirim dengan benar
      })
      .then(function (response) {
        $scope.successMessage = 'Profil berhasil diperbarui!';
        $scope.errorMessage = ''; // Menghapus pesan error sebelumnya
      })
      .catch(function (error) {
        $scope.errorMessage = 'Gagal memperbarui profil.';
        $scope.successMessage = ''; // Menghapus pesan sukses sebelumnya
      });
    };

    // Fungsi logout
    $scope.logout = function () {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    };

    // Preview gambar saat dipilih
    $scope.previewImage = function () {
      var file = document.getElementById('profile-picture').files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.$apply(function () {
            $scope.profile.picturePreview = e.target.result; // Set gambar pratinjau
          });
        };
        reader.readAsDataURL(file); // Mengubah gambar menjadi base64
      }
    };
  });
  $scope.deleteAccount = function () {
    const token = localStorage.getItem('token');
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        $http.delete('http://localhost:3000/api/profile', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(function (response) {
            $scope.successMessage = 'Account deleted successfully!';
            $scope.errorMessage = '';
            localStorage.removeItem('token'); // Remove token after deletion
            window.location.href = 'index.html'; // Redirect to home
        })
        .catch(function (error) {
            $scope.errorMessage = 'Failed to delete account.';
            $scope.successMessage = '';
        });
    }
};