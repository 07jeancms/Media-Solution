    //                 _             
    //       /\       | |            
    //      /  \   ___| |_ ___  _ __ 
    //     / /\ \ / __| __/ _ \| '__|
    //    / ____ \ (__| || (_) | |   
    //   /_/    \_\___|\__\___/|_|   
    //                               
    //   
    app.controller("actorController", actorController);
    actorController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function actorController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                $http.get("http://www.videoextrem.com/api/actors.php?queryType=select")
                    .then(function(response) {
                    $scope.arrayActores = response.data;
                });
            }

        });

        $scope.deleteActor = function(pActualActor){
            $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=delete";
            $scope.actorData = {
                'idActor' : pActualActor.idActor 
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.actorData).
            then(function(data, status) {
                alert("El Actor " + pActualActor.actor + " ha sido borrado");
                location.reload();
            })
        }

        $scope.addActor = function(){
            var actorNameInput = document.getElementById('actorName').value;
            $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=add";
            $scope.actorData = {
                'actor' : actorNameInput 
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.actorData).
            then(function(data, status) {
                alert("El actor " + actorNameInput + " ha sido agregado");
                location.reload();
            })
        }

        $scope.setEditActor = function (pActualActor) {
            $scope.actualActor = pActualActor;
        }

        $scope.editActor = function () {
            var actorNameInput = document.getElementById('updateActorName').value;
            $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=edit";
            $scope.actorData = {
                'idActor' : $scope.actualActor.idActor,
                'actor' : actorNameInput
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.actorData).
            then(function(data, status) {
                alert("El actor " + $scope.actualActor.actor + " ha sido actualizado a " + actorNameInput);
                location.reload();
            })
        }

        $scope.showActor = function(pActualActor){
            $scope.actualActor = pActualActor;
        }

    }