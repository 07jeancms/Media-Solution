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

    class suggestion{

        public $userId = 0;
        public $suggestionId = 0;
        public $userName = "";
        public $date = "";
        public $suggestion = "";
        public $store = "";

        function getSuggestions() {
            $connection = new connection();
            $suggestions = array();
            $select = "SELECT Usuarios.idUsuario as 'idUsuario', Sugerencias.idSugerencia as 'idSugerencia', Sugerencias.sugerencia as 'sugerencia', Sugerencias.fecha as 'fecha',
                        Usuarios.userName as 'userName', Locales.local as 'local'
                        from Sugerencias 
                        INNER JOIN Usuarios on (Sugerencias.idUsuario = Usuarios.idUsuario)
                        INNER JOIN SugerenciasXlocal on (Sugerencias.idSugerencia = SugerenciasXlocal.idSugerencia)
                        INNER JOIN Locales on (SugerenciasXlocal.idLocal = Locales.idLocal);";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $suggestions[] = array("idUsuario"=>$row['idUsuario'], "idSugerencia"=>$row['idSugerencia'], "sugerencia"=>$row['sugerencia'], "fecha"=>$row['fecha'], "userName"=>$row['userName'], "local"=>$row['local']);
            }
            echo json_encode($suggestions); 
        }

        function deleteSuggestion($pSuggestionId) {
            $connection = new connection();
            $call = "call deleteSuggestion('$pSuggestionId');";
            $result = $connection->consult($call);
        }

        function addSuggestion($pUserId, $pSuggestion, $pStore) {
            $connection = new connection();
            
            $call = "call addSuggestion('$pSuggestion', '$pUserId');";
            $result = $connection->consult($call);

            $call = "call addSuggestionByStore('$pStore');";
            $result = $connection->consult($call);
            
            $call = "call addSuggestionsByUser('$pUserId');";
            $result = $connection->consult($call);
        }
    }

    $suggestionClass = new suggestion();

    if ($_queryType == "select"){
        $suggestionClass->getSuggestions();
    }
    if ($_queryType == "delete"){
        $suggestionClass->suggestionId = $request->suggestionId;
        $suggestionClass->deleteSuggestion($suggestionClass->suggestionId);
    }
    if ($_queryType == "add"){
        $suggestionClass->userId = $request->userId;
        $suggestionClass->suggestion = $request->suggestion;
        $suggestionClass->store = $request->store;
        $suggestionClass->addSuggestion($suggestionClass->userId, $suggestionClass->suggestion, $suggestionClass->store);
    }
?>