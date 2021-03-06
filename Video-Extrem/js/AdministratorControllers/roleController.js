//    _____       _           
//   |  __ \     | |          
//   | |__) |___ | | ___  ___ 
//   |  _  // _ \| |/ _ \/ __|
//   | | \ \ (_) | |  __/\__ \
//   |_|  \_\___/|_|\___||___/
//                            
//         
app.controller("roleController", roleController);
roleController.$inject = ['$scope', "$http","dataManager","messageService"];

function roleController ( $scope, $http,dataManager,messageService) {

    $scope.rolesData = dataManager.divData.roles;
    $scope.rolesCollection  = {data : []};
    $scope.itemsByPage=5;
    $scope.actualRol = {};
     $scope.actualDiv = dataManager.actualDiv;
    $scope.actualClass = "";
    
    

    $scope.$watch('rolesData.time', function() {
            var actualTime = $scope.rolesData.time;
            if(actualTime<=3){
                $scope.actualClass = "iconWaiting"+actualTime+" fa-spinner fa-spin";
            }
            else{
                $scope.actualClass = "iconComplete"
            }
        
    });

    //     _____                _       
    //    / ____|              | |      
    //   | |     _ __ ___  __ _| |_ ___ 
    //   | |    | '__/ _ \/ _` | __/ _ \
    //   | |____| | |  __/ (_| | ||  __/
    //    \_____|_|  \___|\__,_|\__\___|
    //                                  
    //                                  
    $scope.addRol = function(){
        var rolNameInput = document.getElementById('RoleName').value;
        $scope.url = "http://www.videoextrem.com/api/roles.php?queryType=add";
        $scope.rolData = {
            'rol' : rolNameInput 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.rolData).
        then(function(data, status) {
            messageService.setMessage("El rol " + rolNameInput + " se ha agregado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
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

    $scope.showRol = function(pActualRol){

        $scope.actualRol = pActualRol;
    }


    //    _    _           _       _       
    //   | |  | |         | |     | |      
    //   | |  | |_ __   __| | __ _| |_ ___ 
    //   | |  | | '_ \ / _` |/ _` | __/ _ \
    //   | |__| | |_) | (_| | (_| | ||  __/
    //    \____/| .__/ \__,_|\__,_|\__\___|
    //          | |                        
    //          |_|                        
    $scope.setEditRol = function (pActualRol) {
        $scope.actualRol = pActualRol;
    }

    $scope.editRol = function () {
        var rolNameInput = document.getElementById('updateRolName').value;
        $scope.url = "http://www.videoextrem.com/api/roles.php?queryType=edit";
        $scope.rolData = {
            'idRol' : $scope.actualRol.idRol,
            'rol' : rolNameInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.rolData).
        then(function(data, status) {
            messageService.setMessage("El rol " + $scope.actualRol.rol + " se ha editado a " + rolNameInput + "correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
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
    $scope.deleteRol = function(pActualRol){
        $scope.url = "http://www.videoextrem.com/api/roles.php?queryType=delete";
        $scope.rolData = {
            'idRol' : pActualRol.idRol 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.rolData).
        then(function(data, status) {
            messageService.setMessage("Eliminado","El rol con id "+pActualRol.idRol+" ha sido eliminado. ");
            var index = $scope.rolesData.roles.indexOf(pActualRol);
            if (index !== -1) {
                $scope.rolesData.roles.splice(index, 1);
            }

        })
    }



}