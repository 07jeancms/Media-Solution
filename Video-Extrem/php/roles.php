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

    class rol{

        public $rolId = 0;
        public $rolName = "";

        function getRoles() {
            $connection = new connection();
            $roles = array();
            $select = 'SELECT * from Roles order by idRol;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $roles[] = array("idRol"=>$row['idRol'], "rol"=>$row['rol']);
            }
            echo json_encode($roles); 
        }

        function deleteRol($pRolId) {
            $connection = new connection();
            $call = "call deleteRole('$pRolId');";
            $result = $connection->consult($call);
        }

        function addRol($pRolName) {
            $connection = new connection();
            $call = "call addRole('$pRolName');";
            $result = $connection->consult($call);
        }
        
        function editRol($pRolId, $pRolName) {
            $connection = new connection();
            $call = "call updateRole('$pRolId','$pRolName');";
            $result = $connection->consult($call);
        }
    }

    $rolClass = new rol();

    if ($_queryType == "select"){
        $rolClass->getRoles();
    }
    if ($_queryType == "delete"){
        $rolClass->rolId = $request->idRol;
        $rolClass->deleteRol($rolClass->rolId);
    }
    if ($_queryType == "add"){
        $rolClass->rolName = $request->rol;
        $rolClass->addRol($rolClass->rolName);
    }
    if ($_queryType == "edit"){
        $rolClass->rolName = $request->rol;
        $rolClass->rolId = $request->idRol;
        $rolClass->editRol($rolClass->rolId, $rolClass->rolName);
    }


?>