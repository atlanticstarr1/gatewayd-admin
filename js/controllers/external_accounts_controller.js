rippleGatewayApp.controller('ExternalAccountsCtrl', [
    '$scope', 'UserService', '$location', 'ApiService', '$window',
    function($scope, $user, $location, $api, $window) {

    if (!$user.isAdmin) {
      $location.path('/login');
    }

    $scope.accounts = [];

    $api.getExternalAccounts(function(err, res) {
      if (!err) {
        $scope.accounts = res.external_accounts;
      }
    });

    $scope.deleteExternalAccount = function(index) {
      var account = $scope.accounts[index],
          confirmed = $window.confirm('Are you sure?');

      if (confirmed) {
        $api.deleteExternalAccount(account.id, function(err, res) {
          if (!err) {
            $scope.accounts.splice(index, 1);
          }
        });
      }
    };

    $scope.updateExternalAccount = function(index) {
      $location.path('/database/external_accounts/' + $scope.accounts[index].id + '/update');
    };
}]);
