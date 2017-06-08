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

  $scope.creatingUser = {
    token: 'NO_TOKEN',
    arrayRoles: [13],
  }

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
    document.getElementById('fblogin').addEventListener('click', function() {
      FB.login(function(response) {
        $scope.loginWithFacebook(response);

      }, {
        scope: 'email,user_likes'
      });
    });

    document.getElementById('logout').addEventListener('click', function() {
      FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
          FB.logout(function(response) {
            document.location.reload();
          });
          $scope.logout();
        }

      });
    });

    document.getElementById('fbregister').addEventListener('click', function() {
      FB.login(function(response) {
        $scope.registerWithFacebook(response);

      }, {
        scope: 'email,user_likes'
      });


    }, false);


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

  $scope.loginWithFacebook = function(response) {
    if (response.authResponse) {
      FB.api('/me', {
        locale: 'tr_TR',
        fields: 'name, email,birthday, hometown,education,gender,website,work'
      }, function(user) {

        $scope.creatingUser = {
          token: 'NO_TOKEN',
          arrayRoles: [13],
          userName: user.name,
          password: user.id,
          email: user.email,
        }

        $scope.userData = {
          userName: user.name,
          userPassword: user.id,
        };
        $scope.authenticateUser();
      });
    } else {
      alert('User cancelled login or did not fully authorize.');
    }

  };
  $scope.registerWithFacebook = function(response) {
    if (response.authResponse) {
      FB.api('/me', {
        locale: 'tr_TR',
        fields: 'name, email,birthday, hometown,education,gender,website,work'
      }, function(user) {
        $scope.creatingUser = {
          token: 'NO_TOKEN',
          arrayRoles: [13],
          userName: user.name,
          password: user.id,
          email: user.email,
        }
        $scope.$apply();


      });
    } else {
      alert('User cancelled login or did not fully authorize.');
    }

  }


  $scope.authenticateUser = function() {
    $http.post($scope.url, $scope.userData)
      .then(function(data, status) {
        if (data.data[0].result != -1) {
          $scope.saveInStorage(data.data[0].result);
          messageService.setMessage('Las credenciales coinciden. El usuario ' + $scope.userData.userName + ' con id ' + data.data[0].result + ' se ha conectado. ');

        } else {
          messageService.setMessage('El usuario ' + $scope.userData.userName + ' no se ha podido autenticar');
          essionStorage.removeItem('currentUser');
          sessionStorage.removeItem('userToken');
          $scope.actualUser = {};
        }
        $scope.checkIfConnected();

      });

  };

  $scope.checkIfConnected = function() {
    if ((sessionStorage.currentUser != null && sessionStorage.userToken != null) && ($scope.isConnected())) {
      $scope.actualUser.userName = sessionStorage.currentUser;
      return true;
    } else {
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('userToken');
      $scope.actualUser = {};
      return false;
    }

  };

  $scope.saveInStorage = function(userId) {
    sessionStorage.currentUser = $scope.userData.userName;
    //TODO Replace this with the user information.
    var encrypted = CryptoJS.AES.encrypt('true', $scope.userData.userName);
    var encryptedId = CryptoJS.AES.encrypt(userId, $scope.userData.userName);
    $scope.setAdministrationPreviliges(userId);
    sessionStorage.userId = encryptedId;
    sessionStorage.userToken = encrypted;
  };

  $scope.getUserId = function() {
    if ($scope.checkIfConnected()) {
      var dencryptedId = CryptoJS.AES.decrypt(sessionStorage.userId, sessionStorage.currentUser).toString(CryptoJS.enc.Utf8);
      return dencryptedId;
    }
  }
  $scope.isConnected = function() {
    var dencryptedToken = CryptoJS.AES.decrypt(sessionStorage.userToken, sessionStorage.currentUser).toString(CryptoJS.enc.Utf8);
    return dencryptedToken == 'true';
  }
  $scope.addUser = function() {
    var url = 'http://www.videoextrem.com/api/users.php?queryType=add';

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, $scope.creatingUser)
      .then(function(data, status) {
        alert('El usuario ' + $scope.creatingUser.userName + ' ha sido agregado');
        $scope.userData = {
          userName: $scope.creatingUser.userName,
          userPassword: $scope.creatingUser.password,
        };
        $scope.authenticateUser()

      });

  };
  $scope.loadActualUser = function() {

  }

  $scope.logout = function() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
    $scope.actualUser = {};
    messageService.setMessage('El usuario ha sido desconectado. ');
  };

  $scope.setAdministrationPreviliges = function(pUserId) {
    var getRoleUrl = 'http://www.videoextrem.com/api/rolesByUser.php?queryType=select';
    var userToRetrive = {
      userId: pUserId,
    };
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    var isAdministrator = false;
    $http.post(getRoleUrl, userToRetrive)
      .then(function(data, status) {
        var tempRolesArray = [];
        for (actualRole = 0; actualRole < data.data.length; actualRole++) {

          isAdministrator = isAdministrator || (data.data[actualRole] != "Cliente");
        }
        if (isAdministrator) {
          var encryptedPrevileges = CryptoJS.AES.encrypt('true', $scope.userData.userName);
          sessionStorage.userPrevileges = encryptedPrevileges;
        }


      });
  };

  $scope.hasAdministrativePrevileges = function() {
    if (sessionStorage.userPrevileges != null) {
      var dencryptedToken = CryptoJS.AES.decrypt(sessionStorage.userPrevileges, sessionStorage.currentUser).toString(CryptoJS.enc.Utf8);
      return dencryptedToken == 'true';
    } else {
      return false;
    }
  }

}
