
//    _    _                   
//   | |  | |                  
//   | |  | |___  ___ _ __ ___ 
//   | |  | / __|/ _ \ '__/ __|
//   | |__| \__ \  __/ |  \__ \
//    \____/|___/\___|_|  |___/
//                             
//     
     
app.controller("userController", userController);
userController.$inject = ['$scope', "$http","dataManager","messageService"];

function userController ( $scope, $http,dataManager,messageService) {

    $scope.userData = dataManager.userData;
    $scope.usersCollection  = {users : []};
    $scope.itemsByPage=5;
    $scope.actualUser = {};
    $scope.roles = dataManager.roleData;

    //     _____                _       
    //    / ____|              | |      
    //   | |     _ __ ___  __ _| |_ ___ 
    //   | |    | '__/ _ \/ _` | __/ _ \
    //   | |____| | |  __/ (_| | ||  __/
    //    \_____|_|  \___|\__,_|\__\___|
    //                                  
    //                                  
    $scope.addUser = function(){
        var rolNameInput = document.getElementById('RoleName').value;
        $scope.url = "http://www.videoextrem.com/api/users.php?queryType=add";
        $scope.rolData = {
            'rol' : rolNameInput 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.rolData).
        then(function(data, status) {
            alert("El rol " + rolNameInput + " ha sido agregado");
            location.reload();
        })
    }

    //    _____                _ 
    //   |  __ \              | |
    //   | |__) |___  __ _  __| |
    //   |  _  // _ \/ _` |/ _` |
    //   | | \ \  __/ (_| | (_| |
    //   |_|  \_\___|\__,_|\__,_|
    //                           
    //                           

    $scope.showRol = function(pActualUser){

        $scope.actualUser = pActualUser;
    }


    //    _    _           _       _       
    //   | |  | |         | |     | |      
    //   | |  | |_ __   __| | __ _| |_ ___ 
    //   | |  | | '_ \ / _` |/ _` | __/ _ \
    //   | |__| | |_) | (_| | (_| | ||  __/
    //    \____/| .__/ \__,_|\__,_|\__\___|
    //          | |                        
    //          |_|                        
    $scope.setEditRol = function (pActualUser) {
        $scope.actualUser = pActualUser;
    }

    $scope.editRol = function () {
        var rolNameInput = document.getElementById('updateRolName').value;
        console.log(rolNameInput);
        $scope.url = "http://www.videoextrem.com/api/users.php?queryType=edit";
        $scope.rolData = {
            'idRol' : $scope.actualUser.idRol,
            'rol' : rolNameInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.rolData).
        then(function(data, status) {
            alert("El rol " + $scope.actualUser.rol + " ha sido actualizado a " + rolNameInput);
            location.reload();
        })
    }
    //    _____       _      _       
    //   |  __ \     | |    | |      
    //   | |  | | ___| | ___| |_ ___ 
    //   | |  | |/ _ \ |/ _ \ __/ _ \
    //   | |__| |  __/ |  __/ ||  __/
    //   |_____/ \___|_|\___|\__\___|
    //                               
    //                               
    $scope.deleteRol = function(pActualUser){
        $scope.url = "http://www.videoextrem.com/api/users.php?queryType=delete";
        $scope.rolData = {
            'idRol' : pActualUser.idRol 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.rolData).
        then(function(data, status) {
            messageService.setMessage("Eliminado","El rol con id "+pActualUser.idRol+" ha sido eliminado. ");
            var index = $scope.userData.users.indexOf(pActualUser);
            if (index !== -1) {
                $scope.userData.users.splice(index, 1);
            }

        })
    }



}