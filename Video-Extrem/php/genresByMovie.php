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

    class genresByMovie{

        public $movieId = 0;

        function getGenresByMovie($pIdMovie) {
            $connection = new connection();
            $genresArray = array();
            $select = "SELECT Generos.genero as 'genero' from GenerosXpelicula
                INNER JOIN Generos on (GenerosXpelicula.idGenero = Generos.idGenero and GenerosXpelicula.idPelicula = '".$pIdMovie."');";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $genresArray[] = array("genero"=>$row['genero']);
            }
            echo json_encode($genresArray); 
        }
        
        function getAllGenres($pIdMovie) {
            $connection = new connection();
            $genresArray = array();
            $select = "SELECT Generos.genero as 'genero' from Generos 
                where Generos.genero 
                NOT IN 
                (SELECT Generos.genero as 'genero' from GenerosXpelicula
                    INNER JOIN Generos on (GenerosXpelicula.idGenero = Generos.idGenero and GenerosXpelicula.idPelicula = '".$pIdMovie."')
                );";
            $result = $connection->consult($select);

            while($row = mysql_fetch_assoc($result)){
                $genresArray[] = array("genero"=>$row['genero']);
            }
            echo json_encode($genresArray); 
        }
    }

    $genresByMovieClass = new genresByMovie();

    if ($_queryType == "select"){
        $genresByMovieClass->movieId = $request->idPelicula;
        $genresByMovieClass->getGenresByMovie($genresByMovieClass->movieId);
    }

    if ($_queryType == "genres"){
        $genresByMovieClass->movieId = $request->idPelicula;
        $genresByMovieClass->getAllGenres($genresByMovieClass->movieId);
    }

?>