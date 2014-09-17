rippleGatewayApp.controller('KycDataCtrl', [
  '$scope',
  'UserService',
  'ApiService',
  '$window', function($scope, $user, $api, $window) {
    if (!$user.isAdmin) {  $location.path('/login') };

    $scope.data = [];

    $api.getKycData(function(err, res) {
      if (!err) {
        $scope.data = res.kyc_data;
      }
    });

    $scope.deleteKycDatum = function(index) {
      var datum = $scope.data[index];
      var confirmed = $window.confirm('Are you sure?')

      if (confirmed) {
        $api.deleteKycDatum(datum.id, function(err, res) {
          if (!err) {
            $scope.data.splice(index, 1);
          }
        });
      }
    };
}]);
