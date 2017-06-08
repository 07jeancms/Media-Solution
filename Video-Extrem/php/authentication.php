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

    class authentication{

        public $idUser = 0;
        public $userName = "";
        public $userPassword = "";

        function authenticateUser($pUserName, $pPassword) {
            $connection = new connection();
            $response = array();
            $select = "call validateAuthentication('$pUserName', '$pPassword');";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $response[] = array("result"=>$row['result']);
            }
            echo json_encode($response);
        }
    }

    $authenticationClass = new authentication();

    if ($_queryType == "tokenAuthentication"){
        $authenticationClass->userName = $request->userName;
        $authenticationClass->userPassword = $request->userPassword;
        $authenticationClass->authenticateUser( $authenticationClass->userName, $authenticationClass->userPassword);
    }
?>
