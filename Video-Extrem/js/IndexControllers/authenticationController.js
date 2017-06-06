//    _    _
//   | |  | |
//   | |  | |___  ___ _ __ ___
//   | |  | / __|/ _ \ '__/ __|
//   | |__| \__ \  __/ |  \__ \
//    \____/|___/\___|_|  |___/
//
//

app.controller('userAuthenticationController', userAuthenticationController);
userAuthenticationController.$inject = ['$scope', '$http', 'dataManager', 'messageService'];

function userAuthenticationController($scope, $http, dataManager, messageService) {


  $scope.actualUser = {};
  $scope.url = 'http://www.videoextrem.com/api/authentication.php?queryType=tokenAuthentication';
  $scope.userData = {
    userName: '',
    userPassword: '',
  };


  $scope.authenticateUser = function () {
    $scope.message = messageService.getHeader();
    $http.post($scope.url, $scope.userData)
      .then(function (data, status) {
        if (data.data[0].result == 1) {
          $scope.saveInStorage($scope.userData.userName)
          messageService.setMessage('Las credenciales coinciden. El usuario ' + $scope.userData.userName + ' se ha conectado. ');

        } else {
          messageService.setMessage('El usuario ' + $scope.userData.userName + ' no se ha podido autenticar');
          essionStorage.removeItem('currentUser');
          sessionStorage.removeItem('userToken');
          $scope.actualUser = {};
        }
        $scope.checkIfConnected();

      });

  };

  $scope.checkIfConnected =function(){
    if(sessionStorage.currentUser != null && sessionStorage.userToken != null){
      //TODO Replace this with the user information.
      $scope.actualUser.userName = sessionStorage.currentUser;
      return true;
    }
    else{
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('userToken');
      $scope.actualUser = {};
      return false;
    }

  };

  $scope.saveInStorage =function(){
    sessionStorage.currentUser = $scope.userData.userName;
    //TODO Replace this with the user information.
    var encrypted = CryptoJS.AES.encrypt('true', $scope.userData.userName);
    sessionStorage.userToken = encrypted;
  };

  $scope.logout = function () {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
    $scope.actualUser = {};
    messageService.setMessage('El usuario ha sido desconectado. ');
  };

}
