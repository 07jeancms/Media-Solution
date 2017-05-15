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

    class actorsByMovie{

        public $movieId = 0;

        function getActorsByMovie($pIdMovie) {
            $connection = new connection();
            $actorsArray = array();
            $select = "SELECT Actores.actor as 'actor' from ActoresXpelicula
                INNER JOIN Actores on (ActoresXpelicula.idActor = Actores.idActor and ActoresXpelicula.idPelicula = '".$pIdMovie."');";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $actorsArray[] = array("actor"=>$row['actor']);
            }
            echo json_encode($actorsArray); 
        }
        
        function getAllActors($pIdMovie) {
            $connection = new connection();
            $actorsArray = array();
            $select = "SELECT Actores.actor as 'actor' from Actores
            WHERE Actores.actor
            NOT IN
            (SELECT Actores.actor as 'actor' from ActoresXpelicula
                INNER JOIN Actores on (ActoresXpelicula.idActor = Actores.idActor and ActoresXpelicula.idPelicula = '".$pIdMovie."')
            );";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $actorsArray[] = array("actor"=>$row['actor']);
            }
            echo json_encode($actorsArray); 
        }
    }

    $actorsByMovieClass = new actorsByMovie();

    if ($_queryType == "select"){
        $actorsByMovieClass->movieId = $request->idPelicula;
        $actorsByMovieClass->getActorsByMovie($actorsByMovieClass->movieId);
    }

    if ($_queryType == "actors"){
        $actorsByMovieClass->movieId = $request->idPelicula;
        $actorsByMovieClass->getAllActors($actorsByMovieClass->movieId);
    }
?>