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

    class genre{

        public $genreId = 0;
        public $genreName = "";
        public $genreDescription = "";

        function getGenres() {
            $connection = new connection();
            $genres = array();
            $select = 'SELECT * from Generos order by idGenero;';
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $genres[] = array("idGenero"=>$row['idGenero'], "genero"=>$row['genero'], "descripcion"=>$row['descripcion']);
            }
            echo json_encode($genres); 
        }
        
        function deleteGenre($pGenreId) {
            $connection = new connection();
            $call = "call deleteGenre('$pGenreId');";
            $result = $connection->consult($call);
        }

        function addGenre($pGenreName, $pGenreDescription) {
            $connection = new connection();
            $call = "call addGenre('$pGenreName', '$pGenreDescription');";
            $result = $connection->consult($call);
        }
        
        function editGenre($pGenreId, $pGenreName, $pGenreDescription) {
            $connection = new connection();
            $call = "call updateGenre('$pGenreId','$pGenreName', '$pGenreDescription');";
            $result = $connection->consult($call);
        }
    }

    $genreClass = new genre();

    if ($_queryType == "select"){
        $genreClass->getGenres();
    }

    if ($_queryType == "delete"){
        $genreClass->genreId = $request->idGenero;
        $genreClass->deleteGenre($genreClass->genreId);

    }

    if ($_queryType == "add"){
        $genreClass->genreName = $request->genero;
        $genreClass->genreDescription = $request->descripcion;
        $genreClass->addGenre($genreClass->genreName, $genreClass->genreDescription);
    }
    
    if ($_queryType == "edit"){
        $genreClass->genreName = $request->genero;
        $genreClass->genreId = $request->idGenero;
        $genreClass->genreDescription = $request->descripcion;
        $genreClass->editGenre($genreClass->genreId, $genreClass->genreName, $genreClass->genreDescription);
    }
?>