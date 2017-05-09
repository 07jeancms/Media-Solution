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

    class actor{

        public $actorId = 0;
        public $actorName = "";

        function getActors() {
            $connection = new connection();
            $actors = array();
            $select = 'SELECT * from Actores;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $actors[] = array("idActor"=>$row['idActor'], "actor"=>$row['actor']);
            }
            echo json_encode($actors); 
        }

        function deleteActor($pActorId) {
            $connection = new connection();
            $call = "call deleteActor('$pActorId');";
            $result = $connection->consult($call);
        }

        function addActor($pActorName) {
            $connection = new connection();
            $call = "call addActor('$pActorName');";
            $result = $connection->consult($call);
        }
        
        function editActor($pActorId, $pActorName) {
            $connection = new connection();
            $call = "call updateActor('$pActorId','$pActorName');";
            $result = $connection->consult($call);
        }
    }

    $actorClass = new actor();

    if ($_queryType == "select"){
        $actorClass->getActors();
    }
    if ($_queryType == "delete"){
        $actorClass->actorId = $request->idActor;
        $actorClass->deleteActor($actorClass->actorId);
    }
    if ($_queryType == "add"){
        $actorClass->actorName = $request->actor;
        $actorClass->addActor($actorClass->actorName);
    }
    if ($_queryType == "edit"){
        $actorClass->actorName = $request->actor;
        $actorClass->actorId = $request->idActor;
        $actorClass->editActor($actorClass->actorId, $actorClass->actorName);
    }


?>