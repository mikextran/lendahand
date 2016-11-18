(function () {
  'use strict';

  // Profiles controller
  angular
    .module('profiles')
    .controller('ProfilesController', ProfilesController);

  ProfilesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'profileResolve'];

  function ProfilesController ($scope, $state, $window, Authentication, profile) {
    var vm = this;

    vm.authentication = Authentication;
    vm.profile = profile;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.updateUserProfile;

    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        vm = new Profiles($scope.profile);

        profile.$update(function (response) {
          $scope.success = true;
          Authentication.profile = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };

    // Remove existing Profile
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.profile.$remove($state.go('profiles.list'));
      }
    }

    // Save Profile
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.profileForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.profile._id) {
        vm.profile.$update(successCallback, errorCallback);
      } else {
        vm.profile.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('profiles.view', {
          profileId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
