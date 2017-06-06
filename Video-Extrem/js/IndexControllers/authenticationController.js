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

  $scope.registrarse = false;

  window.fbAsyncInit = function() {
    FB.init({
      appId: '1543998379019062',
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

    FB.login(function(response) {
      $scope.registerWithFacebook(response);

    },{scope: 'email,user_likes'});

    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }

  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  $scope.registerWithFacebook = function(response){
    if (response.authResponse) {
     FB.api('/me',{ locale: 'tr_TR', fields: 'name, email,birthday, hometown,education,gender,website,work' }, function(user) {
       var userName = user.name;
       var password = user.id;
       var email = user.email;

       alert('Good to see you, ' + JSON.stringify(user) + '.'+user.email);
     });
    } else {
     alert('User cancelled login or did not fully authorize.');
    }

  }


  $scope.authenticateUser = function () {
    $http.post($scope.url, $scope.userData)
      .then(function (data, status) {
        if (data.data[0].result != -1) {
          $scope.saveInStorage(data.data[0].result);
          messageService.setMessage('Las credenciales coinciden. El usuario ' + $scope.userData.userName + ' con id '+data.data[0].result+' se ha conectado. ');

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
    if((sessionStorage.currentUser != null && sessionStorage.userToken != null)&&($scope.isConnected())){
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

  $scope.saveInStorage =function(userId){
    sessionStorage.currentUser = $scope.userData.userName;
    //TODO Replace this with the user information.
    var encrypted = CryptoJS.AES.encrypt('true', $scope.userData.userName);
    var encryptedId = CryptoJS.AES.encrypt(userId, $scope.userData.userName);
    sessionStorage.userId = encryptedId;
    sessionStorage.userToken = encrypted;
  };

  $scope.getUserId = function(){
    var dencryptedId = CryptoJS.AES.decrypt(sessionStorage.userId, sessionStorage.currentUser).toString(CryptoJS.enc.Utf8);
    return dencryptedId;
  }
  $scope.isConnected = function(){
    var dencryptedToken = CryptoJS.AES.decrypt(sessionStorage.userToken, sessionStorage.currentUser).toString(CryptoJS.enc.Utf8);
    return dencryptedToken=='true';
  }

  $scope.loadActualUser = function(){

  }

  $scope.logout = function () {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
    $scope.actualUser = {};
    messageService.setMessage('El usuario ha sido desconectado. ');
  };

}
