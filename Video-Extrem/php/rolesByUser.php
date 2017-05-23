<?php

    include("/connection/connection_class.php");
    header('Content-Type: text/html; charset=utf8_spanish_ci');
    header("Content-Type: text/html;charset=utf-8");
    header('Access-Control-Allow-Origin: *'); 

    $_queryType ="";

    if (isset($_GET['queryType'])) {
        $_queryType = $_GET['queryType'];
    }

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    class rolesByUser{

        public $userId = 0;

        function getRolesByUser($pIdUser) {
            $connection = new connection();
            $rolesArray = array();
            $select = "SELECT Roles.idRol as 'idRol', Roles.rol as 'rol' from RolesXusuario
                INNER JOIN Roles on (RolesXusuario.idRol = Roles.idRol and RolesXusuario.idUsuario = '".$pIdUser."');";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $rolesArray[] = array("rol"=>$row['rol']);
            }
            echo json_encode($rolesArray); 
        }
        
        function getAllRoles($pIdUser) {
            $connection = new connection();
            $genresArray = array();
            $select = "SELECT Roles.rol as 'rol' from Roles 
                where Roles.rol 
                NOT IN 
                (SELECT Roles.rol as 'rol' from RolesXusuario
                    INNER JOIN Roles on (RolesXusuario.idRol = Roles.idRol and RolesXusuario.idUsuario = '".$pIdUser."')
                );";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $genresArray[] = array("rol"=>$row['rol']);
            }
            echo json_encode($genresArray); 
        }
    }

    $rolesByUserClass = new rolesByUser();

    if ($_queryType == "select"){
        $rolesByUserClass->userId = $request->userId;
        $rolesByUserClass->getRolesByUser($rolesByUserClass->userId);
    }

    if ($_queryType == "roles"){
        $rolesByUserClass->userId = $request->userId;
        $rolesByUserClass->getAllRoles($rolesByUserClass->userId);
    }
?>