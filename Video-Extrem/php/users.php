<?php

    include("/connection/connection_class.php");
    header('Content-Type: text/html; charset=utf8_spanish_ci');
    header("Content-Type: text/html;charset=utf-8");
    header('Access-Contactor-Allow-Origin: *'); 

    $_queryType ="";

    if (isset($_GET['queryType'])) {
        $_queryType = $_GET['queryType'];
    }

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    class user{

        public $userId = 0;
        public $userName = "";
        public $token = "";
        public $email = "";
        public $phone = "";
        public $password = "";
        public $arrayRoles = [];
        public $arrayRolesAdd = [];
        public $arrayRolesRemove = [];

        function getUsers() {
            $connection = new connection();
            $users = array();
            $select = 'SELECT * from Usuarios order by idUsuario;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $users[] = array("idUsuario"=>$row['idUsuario'], "token"=>$row['token'], "fechaIngreso"=>$row['fechaIngreso'], "userName"=>$row['userName'], "correo"=>$row['correo'], "telefono"=>$row['telefono'], "password"=>$row['password']);
            }
            echo json_encode($users); 
        }

        function deleteUser($pUserId) {
            $connection = new connection();
            $call = "call deleteUser('$pUserId');";
            $result = $connection->consult($call);
        }

        function addUser($pToken, $pUserName, $pEmail, $pPhone, $pPassword, $pArrayRoles) {
            $connection = new connection();
            $call = "call addUser('$pToken', '$pUserName', '$pEmail', '$pPhone', '$pPassword');";
            $result = $connection->consult($call);
            
            foreach ($pArrayRoles as $roleElement) {
                $call = "call addRoleByUserNoRoleID('$roleElement');";
                $result = $connection->consult($call);
            }
        }
        
        function editUser($pUserId, $pUserName, $pEmail, $pPhone, $pPassword, $pArrayAdd, $pArrayRemove) {
            $connection = new connection();
            $call = "call updateUser('$pUserId','$pUserName', '$pEmail', '$pPhone', '$pPassword');";
            $result = $connection->consult($call);
            foreach ($pArrayAdd as $addElement) {
                $call = "call addRoleByUser('$pUserId','$addElement');";
                $result = $connection->consult($call);
            }            
            foreach ($pArrayRemove as $removeElement) {
                $call = "call deleteRoleByUser('$pUserId','$removeElement');";
                $result = $connection->consult($call);
            }
        }
        
         function authenticateUser($pUserName, $pPassword) {
            $connection = new connection();
            $call = "call validateAuthentication( '$pUserName','$pPassword');";
            $result = $connection->consult($call);
            
        }
        
    }

    $userClass = new user();

    if ($_queryType == "select"){
        $userClass->getUsers();
    }
    if ($_queryType == "delete"){
        $userClass->userId = $request->idUser;
        $userClass->deleteUser($userClass->userId);
    }
    if ($_queryType == "add"){
        $userClass->token = $request->token;
        $userClass->userName = $request->userName;
        $userClass->email = $request->email;
        $userClass->phone = $request->phone;
        $userClass->password = $request->password;
        $userClass->arrayRoles = $request->arrayRoles;
        $userClass->addUser($userClass->token, $userClass->userName, $userClass->email, $userClass->phone, $userClass->password, $userClass->arrayRoles);
    }
    if ($_queryType == "edit"){
        $userClass->userId = $request->userId;
        $userClass->userName = $request->userName;
        $userClass->email = $request->email;
        $userClass->phone = $request->phone;
        $userClass->password = $request->password;
        $userClass->arrayRolesAdd = $request->arrayRolesAdd;
        $userClass->arrayRolesRemove = $request->arrayRolesRemove;
    
        $userClass->editUser($userClass->userId, $userClass->userName, $userClass->email, $userClass->phone, $userClass->password, 
                               $userClass->arrayRolesAdd, $userClass->arrayRolesRemove);
    }

    if ($_queryType == "auth"){
        $userClass->userName = $request->userName;
        $userClass->password = $request->password;
    
        $userClass->authenticateUser( $userClass->userName,$userClass->password);
    }
?>