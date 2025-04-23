angular.module('makeupApp')
.controller('MainController', function($scope, $http, $timeout) {
  $scope.appointments = [];
  $scope.appointment = {};
  $scope.showToast = false;
  $scope.fadingToast = false;

  // Time slot grid (3x3)
  $scope.timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM",
    "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  // Fetch all appointments
  $scope.getAppointments = function() {
    $http.get('http://localhost:5000/api/appointments')
      .then(function(res) {
        $scope.appointments = res.data.map(app => ({
          ...app,
          fading: false
        }));
      })
      .catch(err => {
        console.error("Failed to load appointments:", err);
      });
  };

  // Book new appointment
  $scope.bookAppointment = function () {
    $http.post('http://localhost:5000/api/appointments', $scope.appointment)
      .then(function (res) {
        const newApp = { ...res.data, fading: false };
        $scope.appointments.push(newApp);
        $scope.appointment = {}; // Reset form

        // 🎉 Toast message
        $scope.showToast = true;
        $scope.fadingToast = false;

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }

        // Hide toast after 5s
        $timeout(() => {
          $scope.fadingToast = true;
          $timeout(() => {
            $scope.showToast = false;
            $scope.fadingToast = false;
          }, 600);
        }, 5000);

        // 🗑️ Auto-delete from DB after 5s
        $timeout(() => {
          newApp.fading = true;
          $timeout(() => {
            $http.delete(`http://localhost:5000/api/appointments/${newApp._id}`)
              .then(() => {
                const index = $scope.appointments.indexOf(newApp);
                if (index !== -1) {
                  $scope.appointments.splice(index, 1);
                }
              })
              .catch(err => {
                console.error("Failed to delete from MongoDB:", err);
              });
          }, 600);
        }, 5000);
      })
      .catch(err => {
        console.error("Failed to book appointment:", err);
      });
  };

  // Initialize calendar
  $timeout(() => {
    flatpickr(".calendar", {
      dateFormat: "Y-m-d",
      minDate: "today"
    });
  });

  // Load on page open
  $scope.getAppointments();
});
