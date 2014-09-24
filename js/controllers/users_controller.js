rippleGatewayApp.controller('UsersCtrl', [
  '$scope', 'UserService', '$location', 'ApiService', '$window',
  function($scope, $user, $location, $api, $window) {
    if (!$user.isAdmin) {
      $location.path('/login');
    }

    $scope.users = [];

    $api.getUsers(function(err, res) {
      if (!err && res.success) {
        $scope.users = res.users;
      }
    });

    $scope.deleteUser = function(index) {
      var user = $scope.users[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteUser(user.id, function(err, res) {
          if (!err) {
            $scope.users.splice(index, 1);
          }
        });
      }
    };

    $scope.updateUser = function(index) {
      $location.path('/database/users/' + $scope.users[index].id + '/update');
    };
}]);
