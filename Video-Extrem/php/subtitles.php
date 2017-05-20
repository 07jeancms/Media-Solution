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

    class subtitle{

        public $subtitleId = 0;
        public $subtitleName = "";

        function getSubtitles() {
            $connection = new connection();
            $subtitles = array();
            $select = 'SELECT * from Subtitulos order by idSubtitulo;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $subtitulos[] = array("idSubtitulo"=>$row['idSubtitulo'], "subtitulo"=>$row['subtitulo']);
            }
            echo json_encode($subtitulos); 
        }
        
        function deleteSubtitle($pSubtitleId) {
            $connection = new connection();
            $call = "call deleteSubtitle('$pSubtitleId');";
            $result = $connection->consult($call);
        }

        function addSubtitle($pSubtitle) {
            $connection = new connection();
            $call = "call addSubtitle('$pSubtitle');";
            $result = $connection->consult($call);
        }
        
        function editSubtitle($pSubtitleId, $pSubtitleName) {
            $connection = new connection();
            $call = "call updateSubtitle('$pSubtitleId','$pSubtitleName');";
            $result = $connection->consult($call);
        }
    }

    $subtitleClass = new subtitle();

    if ($_queryType == "select"){
        $subtitleClass->getSubtitles();
    }

    if ($_queryType == "delete"){
        $subtitleClass->subtitleId = $request->idSubtitulo;
        $subtitleClass->deleteSubtitle($subtitleClass->subtitleId);
    }

    if ($_queryType == "add"){
        $subtitleClass->subtitleName = $request->subtitulo;
        $subtitleClass->addSubtitle($subtitleClass->subtitleName);
    }
    
    if ($_queryType == "edit"){
        $subtitleClass->subtitleName = $request->subtitulo;
        $subtitleClass->subtitleId = $request->idSubtitulo;
        $subtitleClass->editSubtitle($subtitleClass->subtitleId, $subtitleClass->subtitleName);
    }
?>